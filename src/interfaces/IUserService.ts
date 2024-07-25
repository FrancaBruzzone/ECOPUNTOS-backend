import User from '../data/models/User';

export interface IUserService {
    create(user: User): Promise<User>;
    login(email: string, password: string): Promise<string>;
    logout(token: string): Promise<boolean>;
}
