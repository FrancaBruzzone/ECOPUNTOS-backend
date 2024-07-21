import { container } from 'tsyringe';
import { UserRepository } from '../data/repositories/UserRepository';
import { IUserService } from '../interfaces/IUserService';
import { UserService } from '../services/UserService';
import { IRoleService } from '../interfaces/IRoleService';
import { RoleRepository } from '../data/repositories/RoleRepository';
import { RoleService } from '../services/RoleService';
import { CompanyRepository } from '../data/repositories/CompanyRepository';
import { ICompanyService } from '../interfaces/ICompanyService';
import { CompanyService } from '../services/CompanyService';

container.register('IUserRepository', {
    useClass: UserRepository,
});

container.register<IUserService>('IUserService', {
    useClass: UserService,
});

container.register('IRoleRepository', {
    useClass: RoleRepository,
});

container.register<IRoleService>('IRoleService', {
    useClass: RoleService,
});

container.register('ICompanyRepository', {
    useClass: CompanyRepository,
});

container.register<ICompanyService>('ICompanyService', {
    useClass: CompanyService,
});

export default container;
