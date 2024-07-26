import { Attributes, Model, ModelCtor, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import User from '../models/User';
import { IUserRepository } from '../../interfaces/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
    public async create(entity: User): Promise<void> {
        try {
            await User.create(entity as any);
        } catch (error: any) {
            throw new Error(`Error al agregar la entidad: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<User | null> {
        try {
            const entity = await User.findByPk(id);
            return entity;
        } catch (error: any) {
            throw new Error(
                `Error al obtener la entidad por ID: ${error.message}`,
            );
        }
    }

    public async update(id: number, entity: Partial<User>): Promise<boolean> {
        try {
            const result = await User.update(entity, {
                where: { id } as any,
            });
            return result[0] > 0;
        } catch (error: any) {
            throw new Error(`Error al actualizar la entidad: ${error.message}`);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const whereOptions: WhereOptions<Attributes<User>> = {
                where: { id } as any,
            };
            const result = await User.destroy(whereOptions);
            return result > 0;
        } catch (error: any) {
            throw new Error(`Error al eliminar la entidad: ${error.message}`);
        }
    }

    public async getAll(): Promise<User[]> {
        try {
            const entities = await User.findAll();
            return entities;
        } catch (error: any) {
            throw new Error(
                `Error al obtener todas las entidades: ${error.message}`,
            );
        }
    }
}
