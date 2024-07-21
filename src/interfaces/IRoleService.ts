import Role from '../data/models/Role';

export interface IRoleService {
    create(role: Role): Promise<Role>;
    get(id: number): Promise<Role>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<Role[]>;
}
