import { Attributes, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import Role from '../models/Role';
import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { NotFoundError } from '../../exceptions/NotFoundError';

@injectable()
export class RoleRepository implements IRoleRepository {
    public async create(role: Role): Promise<Role> {
        return await Role.create({
            name: role.name,
        });
    }

    public async findById(id: number): Promise<Role | null> {
        const entity = await Role.findByPk(id);
        return entity;
    }

    public async findByName(name: string): Promise<Role | null> {
        const role = await Role.findOne({ where: { name } });
        return role;
    }

    public async delete(id: number): Promise<boolean> {
        const whereOptions: WhereOptions<Attributes<Role>> = {
            where: { id } as any,
        };
        const result = await Role.destroy(whereOptions);
        return result > 0;
    }

    public async getAll(): Promise<Role[]> {
        const entities = await Role.findAll();
        return entities;
    }
}
