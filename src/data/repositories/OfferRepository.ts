import { injectable } from 'tsyringe';
import Offer from '../models/Offer';
import { IOfferRepository } from '../../interfaces/IOfferRepository';

@injectable()
export class OfferRepository implements IOfferRepository {
    public async create(offer: Offer): Promise<Offer> {
        return await Offer.create({
            code: offer.code,
            name: offer.name,
            description: offer.description,
            stock: offer.stock,
            amount: offer.amount,
            minPointsRequired: offer.minPointsRequired,
            maxPointsRequired: offer.maxPointsRequired,
            productPicture: offer.productPicture,
            isActive: offer.isActive,
            allowsCancelExchange: offer.allowsCancelExchange,
            exchangeCompletedCount: offer.exchangeCompletedCount,
            userId: offer.userId,
        });
    }

    public async findById(id: number): Promise<Offer | null> {
        const offer = await Offer.findByPk(id);
        return offer;
    }

    public async findByCode(code: string): Promise<Offer | null> {
        const offer = await Offer.findOne({ where: { code } });
        return offer;
    }

    public async getAll(filters: any): Promise<Offer[]> {
        const offers = await Offer.findAll(filters);
        return offers;
    }

    public async getCount(): Promise<number> {
        return Offer.count();
    }
}
