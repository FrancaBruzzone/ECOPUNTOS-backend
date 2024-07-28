import { Attributes, Transaction, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import User from '../models/User';
import { IUserRepository } from '../../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
    public async create(
        user: User,
        options: { transaction?: Transaction } = {},
    ): Promise<User> {
        return await User.create({
            email: user.email,
            password: user.password,
            roles: user.roles,
        });
    }

    public async findById(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    public async update(id: number, user: Partial<User>): Promise<boolean> {
        const result = await User.update(user, {
            where: { id } as any,
        });
        return result[0] > 0;
    }

    public async delete(id: number): Promise<boolean> {
        const whereOptions: WhereOptions<Attributes<User>> = {
            where: { id } as any,
        };
        const result = await User.destroy(whereOptions);
        return result > 0;
    }

    public async getAll(): Promise<User[]> {
        const users = await User.findAll();
        return users;
    }
}
