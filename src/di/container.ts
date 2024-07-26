import { container } from 'tsyringe';
import { UserRepository } from '../data/repositories/UserRepository';
import { IUserService } from '../interfaces/IUserService';
import { UserService } from '../services/UserService';
import { CompanyRepository } from '../data/repositories/CompanyRepository';
import { ICompanyService } from '../interfaces/ICompanyService';
import { CompanyService } from '../services/CompanyService';
import { UserSessionRepository } from '../data/repositories/UserSessionRepository';
import { OfferRepository } from '../data/repositories/OfferRepository';
import { IOfferService } from '../interfaces/IOfferService';
import { OfferService } from '../services/OfferService';

container.register('IUserRepository', {
    useClass: UserRepository,
});

container.register<IUserService>('IUserService', {
    useClass: UserService,
});

container.register('ICompanyRepository', {
    useClass: CompanyRepository,
});

container.register<ICompanyService>('ICompanyService', {
    useClass: CompanyService,
});

container.register('IUserSessionRepository', {
    useClass: UserSessionRepository,
});

container.register('IOfferRepository', {
    useClass: OfferRepository,
});

container.register<IOfferService>('IOfferService', {
    useClass: OfferService,
});

export default container;
