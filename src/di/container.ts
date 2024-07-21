import { container } from 'tsyringe';
import { UserRepository } from '../data/repositories/UserRepository';

container.register('IUserRepository', {
    useClass: UserRepository,
});

export default container;
