import User from '../data/models/User';

export interface IUserRepository {
    create(entity: User): Promise<void>;
    findById(id: number): Promise<User | null>;
    update(id: number, entity: Partial<User>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<User[]>;
}
