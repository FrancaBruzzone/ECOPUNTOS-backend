import Offer from '../data/models/Offer';
import { IPaginationResponse } from './IPaginationResponse';

export interface IOfferService {
    create(offer: Offer): Promise<Offer>;
    get(id: number): Promise<Offer>;
    getAll(filters: any): Promise<IPaginationResponse<Offer>>;
}
