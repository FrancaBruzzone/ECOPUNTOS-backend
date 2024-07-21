import { Repository } from './Repository';
import User from '../models/User';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User);
    }

    // Métodos específicos para User
}
