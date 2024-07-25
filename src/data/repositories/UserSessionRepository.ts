import { injectable } from 'tsyringe';
import UserSession from '../models/UserSession';
import { IUserSessionRepository } from '../../interfaces/IUserSessionRepository';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class UserSessionRepository implements IUserSessionRepository {
    public async create(userId: number): Promise<UserSession> {
        const sessionId = uuidv4();

        return await UserSession.create({
            sessionId: sessionId,
            userId: userId,
        });
    }

    public async findById(id: number): Promise<UserSession | null> {
        const userSession = await UserSession.findByPk(id);
        return userSession;
    }

    public async findBySessionId(
        sessionId: string,
    ): Promise<UserSession | null> {
        const userSession = await UserSession.findOne({ where: { sessionId } });
        return userSession;
    }

    public async delete(userSession: UserSession): Promise<boolean> {
        const result = await UserSession.update(
            { isEnabled: false },
            {
                where: { id: userSession.id } as any,
            },
        );
        return result[0] > 0;
    }

    public async getAll(): Promise<UserSession[]> {
        const userSessions = await UserSession.findAll({
            where: { isEnabled: true },
        });
        return userSessions;
    }
}
