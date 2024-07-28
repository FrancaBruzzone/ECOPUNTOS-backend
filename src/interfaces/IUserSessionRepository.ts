import UserSession from '../data/models/UserSession';

export interface IUserSessionRepository {
    create(userId: number): Promise<UserSession>;
    findById(id: number): Promise<UserSession | null>;
    findBySessionId(sessionId: string): Promise<UserSession | null>;
    delete(userSession: UserSession): Promise<boolean>;
    getAll(): Promise<UserSession[]>;
}
