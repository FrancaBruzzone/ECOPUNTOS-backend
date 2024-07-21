import User from '../data/models/User';

export interface IUserService {
    createUser(user: User): Promise<User>;
}
