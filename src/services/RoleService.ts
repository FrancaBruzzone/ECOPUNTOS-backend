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

    public async createRole(role: Role): Promise<Role> {
        const existingRole = await this.roleRepository.findByName(role.name);

        if (existingRole)
            throw new ConflictError(
                `El rol ${role.name.toUpperCase()} ya existe`,
            );

        return await this.roleRepository.create(role);
    }

    public async getRole(id: number): Promise<Role> {
        const existingRole = await this.roleRepository.findById(id);

        if (!existingRole)
            throw new NotFoundError(`El rol con Id ${id} no existe`);

        return existingRole;
    }

    public async deleteRole(id: number): Promise<boolean> {
        const existingRole = await this.roleRepository.findById(id);

        if (!existingRole)
            throw new NotFoundError(`El rol con ID ${id} no existe`);

        return await this.roleRepository.delete(id);
    }

    public async getRoles(): Promise<Role[]> {
        return this.roleRepository.getAll();
    }
}
