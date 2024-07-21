import { Repository } from './Repository';
import Role from '../models/Role';

export class RoleRepository extends Repository<Role> {
    constructor() {
        super(Role);
    }

    // Métodos específicos para Role
}
