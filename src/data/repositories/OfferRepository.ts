import { Repository } from './Repository';
import Offer from '../models/Offer';

export class OfferRepository extends Repository<Offer> {
    constructor() {
        super(Offer);
    }

    // Métodos específicos para Offer
}
