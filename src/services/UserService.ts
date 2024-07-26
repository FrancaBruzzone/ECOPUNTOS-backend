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
import { IRoleRepository } from '../interfaces/IRoleRepository';

interface TokenPayload {
    id: number;
    email: string;
    sessionId: string;
}

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository')
        private userRepository: IUserRepository,
        @inject('IUserSessionRepository')
        private userSessionRepository: IUserSessionRepository,
        @inject('IRoleRepository')
        private roleRepository: IRoleRepository,
    ) {}

    public async create(user: User): Promise<User> {
        const transaction = await getSequelizeInstance().transaction();

        try {
            const existingAccount = await this.userRepository.findByEmail(
                user.email,
            );

            if (existingAccount) {
                throw new ConflictError(`El email ${user.email} ya existe`);
            }

            const role = await this.roleRepository.findByName('USER');

            if (!role)
                throw new NotFoundError(
                    'El rol "User" no se encuentra en la base de datos',
                );

            const createdUser = await this.userRepository.create(user, {
                transaction,
            });

            await createdUser.$set('roles', [role.id], { transaction });
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

        const token = this.generateJwtToken({
            id: user.id,
            email: user.email,
            sessionId: userSession.sessionId,
        });

        return token;
    }

    public async logout(token: string): Promise<boolean> {
        let payload: TokenPayload;
        try {
            payload = jwt.verify(
                token,
                process.env.JWT_SECRET!,
            ) as TokenPayload;
        } catch (error) {
            throw new InvalidCredentialsError('Token inválido');
        }

        const userSession = await this.userSessionRepository.findBySessionId(
            payload.sessionId,
        );
        if (!userSession)
            throw new NotFoundError('Sesión de usuario no encontrada');

        return await this.userSessionRepository.delete(userSession);
    }

    private generateJwtToken(payload: TokenPayload): string {
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }
}
