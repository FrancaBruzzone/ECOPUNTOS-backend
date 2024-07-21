import User from '../data/models/User';

export interface IUserRepository {
    create(entity: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, entity: Partial<User>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<User[]>;
}
