import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUserService } from '../interfaces/IUserService';
import User from '../data/models/User';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../interfaces/IUserRepository';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { InvalidCredentialsError } from '../exceptions/InvalidCredentialsError';
import { IUserSessionRepository } from '../interfaces/IUserSessionRepository';
import { getSequelizeInstance } from '../data/config/sequelize';
import { ITokenPayload } from '../interfaces/ITokenPayload';
import { generateJwtToken } from '../utils/generateJwtToken';
import { Role } from '../data/models/enumerations/Role';
import { addRoleToUser } from '../utils/roleUtils';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository')
        private userRepository: IUserRepository,
        @inject('IUserSessionRepository')
        private userSessionRepository: IUserSessionRepository,
    ) {}

    public async create(user: User): Promise<User> {
        const transaction = await getSequelizeInstance().transaction();

        try {
            const existingAccount = await this.userRepository.findByEmail(
                user.email,
            );

            if (existingAccount)
                throw new ConflictError(`El email ${user.email} ya existe`);

            user.roles = addRoleToUser(user.roles, Role.User);
            const createdUser = await this.userRepository.create(user, {
                transaction,
            });

            await transaction.commit();
            return createdUser;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError('Usuario no encontrado');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new InvalidCredentialsError('Credenciales inválidas');

        const userSession = await this.userSessionRepository.create(user.id);
        const token = await generateJwtToken(user, userSession);

        return token;
    }

    public async logout(token: string): Promise<boolean> {
        let payload: ITokenPayload;
        try {
            payload = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as ITokenPayload;
        } catch (error) {
            throw new InvalidCredentialsError('Token inválido');
        }

        const userSession = await this.userSessionRepository.findBySessionId(
            payload.userSessionId,
        );
        if (!userSession)
            throw new NotFoundError('Sesión de usuario no encontrada');

        return await this.userSessionRepository.delete(userSession);
    }
}
