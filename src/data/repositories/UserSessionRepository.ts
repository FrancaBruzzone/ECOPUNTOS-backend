import { Repository } from './Repository';
import UserSession from '../models/UserSession';

export class UserSessionRepository extends Repository<UserSession> {
    constructor() {
        super(UserSession);
    }

    // Métodos específicos para UserSession
}
