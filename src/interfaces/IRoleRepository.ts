import Role from '../data/models/Role';

export interface IRoleRepository {
    create(role: Role): Promise<Role>;
    findById(id: number): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<Role[]>;
}
