import { Repository } from './Repository';
import Investment from '../models/Investment';

export class InvestmentRepository extends Repository<Investment> {
    constructor() {
        super(Investment);
    }

    // Métodos específicos para Investment
}
