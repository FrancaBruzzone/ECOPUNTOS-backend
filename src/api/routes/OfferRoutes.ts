import { Router } from 'express';
import { IOfferService } from '../../interfaces/IOfferService';
import OfferController from '../controllers/OfferController';
import { checkToken } from '../../middlewares/checkToken';
import { Role } from '../../data/models/enumerations/Role';
import { checkRoles } from '../../middlewares/checkRoles';
import { checkSameUserOrRoles } from '../../middlewares/checkSameUserOrRoles';

const router = Router();

router.post(
    '/offers',
    checkToken,
    checkRoles([Role.Admin]),
    async (req, res) => {
        const offerService: IOfferService = req.app.get('offerService');
        const offerController = new OfferController(offerService);
        return offerController.create(req, res);
    },
);

router.get('/offers/:id', checkToken, async (req, res) => {
    const offerService: IOfferService = req.app.get('offerService');
    const offerController = new OfferController(offerService);
    return offerController.get(req, res);
});

router.get('/offers', checkToken, async (req, res) => {
    const offerService: IOfferService = req.app.get('offerService');
    const offerController = new OfferController(offerService);
    return offerController.getAll(req, res);
});

export default router;
