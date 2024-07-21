import User from '../data/models/User';

export interface IUserService {
    create(user: User): Promise<User>;
}
