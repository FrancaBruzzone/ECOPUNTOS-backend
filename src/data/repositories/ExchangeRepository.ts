import { Repository } from './Repository';
import Exchange from '../models/Exchange';

export class ExchangeRepository extends Repository<Exchange> {
    constructor() {
        super(Exchange);
    }

    // Métodos específicos para Exchange
}
