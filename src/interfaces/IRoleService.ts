import Role from '../data/models/Role';

export interface IRoleService {
    createRole(role: Role): Promise<Role>;
    getRole(id: number): Promise<Role>;
    deleteRole(id: number): Promise<boolean>;
    getRoles(): Promise<Role[]>;
}
