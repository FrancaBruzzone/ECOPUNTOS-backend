import { Model, ModelCtor } from 'sequelize';

export interface IRepository<T extends Model> {
    create(entity: T): Promise<void>;
    findById(id: number): Promise<T | null>;
    update(id: number, entity: Partial<T>): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<T[]>;
}
