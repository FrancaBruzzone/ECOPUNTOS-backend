import { container } from 'tsyringe';
import { UserRepository } from '../data/repositories/UserRepository';
import { ActivityTypeRepository } from '../data/repositories/ActivityTypeRepository';
import { CompanyRepository } from '../data/repositories/CompanyRepository';
import { DocumentRepository } from '../data/repositories/DocumentRepository';
import { ExchangeRepository } from '../data/repositories/ExchangeRepository';
import { InvestmentRepository } from '../data/repositories/InvestmentRepository';
import { UserSessionRepository } from '../data/repositories/UserSessionRepository';
import { SettingRepository } from '../data/repositories/SettingRepository';
import { RoleRepository } from '../data/repositories/RoleRepository';
import { PointsBalanceRepository } from '../data/repositories/PointsBalanceRepository';
import { OfferRepository } from '../data/repositories/OfferRepository';

container.register('IActivityTypeRepository', {
    useClass: ActivityTypeRepository,
});

container.register('ICompanyRepository', {
    useClass: CompanyRepository,
});

container.register('IDocumentRepository', {
    useClass: DocumentRepository,
});

container.register('IExchangeRepository', {
    useClass: ExchangeRepository,
});

container.register('IInvestmentRepository', {
    useClass: InvestmentRepository,
});

container.register('IOfferRepository', {
    useClass: OfferRepository,
});

container.register('IPointsBalanceRepository', {
    useClass: PointsBalanceRepository,
});

container.register('IRoleRepository', {
    useClass: RoleRepository,
});

container.register('ISettingRepository', {
    useClass: SettingRepository,
});

container.register('IUserRepository', {
    useClass: UserRepository,
});

container.register('IUserSessionRepository', {
    useClass: UserSessionRepository,
});

export default container;
