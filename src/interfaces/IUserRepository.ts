import { Transaction } from 'sequelize';
import User from '../data/models/User';

export interface IUserRepository {
    create(user: User, options: { transaction?: Transaction }): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, user: Partial<User>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<User[]>;
}
