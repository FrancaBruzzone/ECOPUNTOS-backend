import { IUserService } from '../interfaces/IUserService';
import User from '../data/models/User';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../interfaces/IUserRepository';
import { ConflictError } from '../exceptions/ConflictError';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async createUser(user: User): Promise<User> {
        const existingAccount = await this.userRepository.findByEmail(
            user.email,
        );

        if (existingAccount) throw new ConflictError('El email ya existe');

        return await this.userRepository.create(user);
    }
}
