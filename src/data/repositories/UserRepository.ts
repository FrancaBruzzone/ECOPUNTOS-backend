import { Attributes, Model, ModelCtor, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import User from '../models/User';
import { IUserRepository } from '../../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
    public async create(user: User): Promise<User> {
        return await User.create({
            email: user.email,
            password: user.password,
        });
    }

    public async findById(id: number): Promise<User | null> {
        const entity = await User.findByPk(id);
        return entity;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    public async update(id: number, entity: Partial<User>): Promise<boolean> {
        const result = await User.update(entity, {
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
        const entities = await User.findAll();
        return entities;
    }
}
