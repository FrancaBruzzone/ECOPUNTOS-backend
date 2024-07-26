import { inject, injectable } from 'tsyringe';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import Offer from '../data/models/Offer';
import { IOfferService } from '../interfaces/IOfferService';
import { IOfferRepository } from '../interfaces/IOfferRepository';
import { IPaginationResponse } from '../interfaces/IPaginationResponse';

@injectable()
export class OfferService implements IOfferService {
    constructor(
        @inject('IOfferRepository')
        private offerRepository: IOfferRepository,
    ) {}

    public async create(offer: Offer): Promise<Offer> {
        const existingOffer = await this.offerRepository.findByCode(offer.code);

        if (existingOffer)
            throw new ConflictError(`La oferta ${offer.name} ya existe`);

        return await this.offerRepository.create(offer);
    }

    public async get(id: number): Promise<Offer> {
        const existingOffer = await this.offerRepository.findById(id);

        if (!existingOffer)
            throw new NotFoundError(`La oferta con Id ${id} no existe`);

        return existingOffer;
    }

    public async getAll(filters: any): Promise<IPaginationResponse<Offer>> {
        const total = await this.offerRepository.getCount();
        const offers = await this.offerRepository.getAll(filters);

        return {
            elements: offers,
            pagination: {
                total,
                limit: filters.limit,
                offset: filters.offset,
            },
        };
    }
}
