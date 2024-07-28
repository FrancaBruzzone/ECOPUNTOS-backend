import { Router } from 'express';
import { ICompanyService } from '../../interfaces/ICompanyService';
import CompanyController from '../controllers/CompanyController';
import { checkToken } from '../../middlewares/checkToken';

const router = Router();

router.post('/companies', checkToken, async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.create(req, res);
});

router.get('/companies/:id', checkToken, async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.get(req, res);
});

router.delete('/companies/:id', checkToken, async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.delete(req, res);
});

router.get('/companies', checkToken, async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.getAll(req, res);
});

export default router;
