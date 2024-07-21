import { Router } from 'express';
import { ICompanyService } from '../../interfaces/ICompanyService';
import CompanyController from '../controllers/CompanyController';

const router = Router();

router.post('/companies', async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.create(req, res);
});

router.get('/companies/:id', async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.get(req, res);
});

router.delete('/companies/:id', async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.delete(req, res);
});

router.get('/companies', async (req, res) => {
    const companyService: ICompanyService = req.app.get('companyService');
    const companyController = new CompanyController(companyService);
    return companyController.getAll(req, res);
});

export default router;
