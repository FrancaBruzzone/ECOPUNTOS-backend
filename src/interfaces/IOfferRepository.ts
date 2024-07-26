import Offer from '../data/models/Offer';

export interface IOfferRepository {
    create(offer: Offer): Promise<Offer>;
    findById(id: number): Promise<Offer | null>;
    findByCode(code: string): Promise<Offer | null>;
    getAll(filters: any): Promise<Offer[]>;
    getCount(): Promise<number>;
}
