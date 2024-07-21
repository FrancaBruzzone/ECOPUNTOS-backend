import { IUserService } from '../interfaces/IUserService';
import User from '../data/models/User';
import { inject, injectable } from 'tsyringe';
import { IRepository } from '../interfaces/IRepository';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository')
        private userRepository: IRepository<User>,
    ) {}

    public async createUser(user: User): Promise<User> {
        try {
            const existingAccount = await this.userRepository.findByEmail({
                where: { email: user.email },
            });

            if (existingAccount) throw new Error('El email ya existe');

            return await this.userRepository.create(user);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`);
            }
            throw error;
        }
    }
}
