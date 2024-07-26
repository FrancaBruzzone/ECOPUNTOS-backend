import { Request, Response } from 'express';
import { IOfferService } from '../../interfaces/IOfferService';
import Offer from '../../data/models/Offer';
import { extractLimitAndOffset } from '../../utils/extractLimitAndOffset';
import { ICustomRequest } from '../../interfaces/ICustomRequest';

class OfferController {
    private offerService: IOfferService;

    constructor(offerService: IOfferService) {
        this.offerService = offerService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        const {
            code,
            name,
            description,
            stock,
            amount,
            minPointsRequired,
            maxPointsRequired,
            allowsCancelExchange,
        } = req.body;
        const offerToCreate = Offer.build({
            code,
            name,
            description,
            stock,
            amount,
            minPointsRequired,
            maxPointsRequired,
            allowsCancelExchange,
            userId: (req as ICustomRequest).userId,
        });

        const newOffer = await this.offerService.create(offerToCreate);

        res.status(201).json({
            message: 'Oferta creada con éxito',
            data: newOffer,
        });
    }

    public async get(req: Request, res: Response): Promise<void> {
        let id = parseInt(req.params.id, 10);
        const offer = await this.offerService.get(id);

        res.status(200).json({
            message: 'Lectura de oferta realizada con éxito',
            data: offer,
        });
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        let filters = extractLimitAndOffset(req);

        const offers = await this.offerService.getAll(filters);

        res.status(200).json({
            message: 'Lectura de ofertas realizada con éxito',
            data: offers,
        });
    }
}

export default OfferController;
