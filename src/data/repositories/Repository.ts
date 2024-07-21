import { IRepository } from '../../interfaces/IRepository';
import { Attributes, Model, ModelCtor, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';

@injectable()
export class Repository<T extends Model> implements IRepository<T> {
    private model: ModelCtor<T>;

    constructor(model: ModelCtor<T>) {
        this.model = model;
    }

    public async create(entity: T): Promise<T> {
        try {
            console.log(entity);
            return await this.model.create(entity as any);
        } catch (error: any) {
            throw new Error(`Error al agregar la entidad: ${error.message}`);
        }
    }

    public async findById(id: number): Promise<T | null> {
        try {
            const entity = await this.model.findByPk(id);
            return entity;
        } catch (error: any) {
            throw new Error(
                `Error al obtener la entidad por ID: ${error.message}`,
            );
        }
    }

    public async update(id: number, entity: Partial<T>): Promise<boolean> {
        try {
            const result = await this.model.update(entity, {
                where: { id } as any,
            });
            return result[0] > 0;
        } catch (error: any) {
            throw new Error(`Error al actualizar la entidad: ${error.message}`);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const whereOptions: WhereOptions<Attributes<T>> = {
                where: { id } as any,
            };
            const result = await this.model.destroy(whereOptions);
            return result > 0;
        } catch (error: any) {
            throw new Error(`Error al eliminar la entidad: ${error.message}`);
        }
    }

    public async getAll(): Promise<T[]> {
        try {
            const entities = await this.model.findAll();
            return entities;
        } catch (error: any) {
            throw new Error(
                `Error al obtener todas las entidades: ${error.message}`,
            );
        }
    }
}
