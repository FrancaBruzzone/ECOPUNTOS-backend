import { Repository } from './Repository';
import Company from '../models/Company';

export class CompanyRepository extends Repository<Company> {
    constructor() {
        super(Company);
    }

    // Métodos específicos para Company
}
