import { container } from 'tsyringe';
import { UserRepository } from '../data/repositories/UserRepository';
import { IUserService } from '../interfaces/IUserService';
import { UserService } from '../services/UserService';

container.register('IUserRepository', {
    useClass: UserRepository,
});

container.register<IUserService>('IUserService', {
    useClass: UserService,
});

export default container;
