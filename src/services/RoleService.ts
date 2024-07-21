import { inject, injectable } from 'tsyringe';
import { ConflictError } from '../exceptions/ConflictError';
import Role from '../data/models/Role';
import { IRoleRepository } from '../interfaces/IRoleRepository';
import { IRoleService } from '../interfaces/IRoleService';
import { NotFoundError } from '../exceptions/NotFoundError';

@injectable()
export class RoleService implements IRoleService {
    constructor(
        @inject('IRoleRepository')
        private roleRepository: IRoleRepository,
    ) {}

    public async create(role: Role): Promise<Role> {
        const existingRole = await this.roleRepository.findByName(role.name);

        if (existingRole)
            throw new ConflictError(
                `El rol ${role.name.toUpperCase()} ya existe`,
            );

        return await this.roleRepository.create(role);
    }

    public async get(id: number): Promise<Role> {
        const existingRole = await this.roleRepository.findById(id);

        if (!existingRole)
            throw new NotFoundError(`El rol con Id ${id} no existe`);

        return existingRole;
    }

    public async delete(id: number): Promise<boolean> {
        const existingRole = await this.roleRepository.findById(id);

        if (!existingRole)
            throw new NotFoundError(`El rol con Id ${id} no existe`);

        return await this.roleRepository.delete(id);
    }

    public async getAll(): Promise<Role[]> {
        return this.roleRepository.getAll();
    }
}
