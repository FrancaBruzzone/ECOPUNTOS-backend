import { Request, Response } from 'express';
import { ICompanyService } from '../../interfaces/ICompanyService';
import Company from '../../data/models/Company';
import { extractLimitAndOffset } from '../../utils/extractLimitAndOffset';

class CompanyController {
    private companyService: ICompanyService;

    constructor(companyService: ICompanyService) {
        this.companyService = companyService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        const companyToCreate = Company.build({
            name,
        });

        const newCompany = await this.companyService.create(companyToCreate);

        res.status(201).json({
            message: 'Empresa creada con éxito',
            data: newCompany,
        });
    }

    public async get(req: Request, res: Response): Promise<void> {
        let id = parseInt(req.params.id, 10);
        const company = await this.companyService.get(id);

        res.status(200).json({
            message: 'Lectura de empresa realizada con éxito',
            data: company,
        });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        let id = parseInt(req.params.id, 10);
        const companyWasDeleted = await this.companyService.delete(id);

        if (companyWasDeleted)
            res.status(200).json({
                message: 'Empresa eliminada con éxito',
            });
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        let filters = extractLimitAndOffset(req);

        const companies = await this.companyService.getAll(filters);

        res.status(200).json({
            message: 'Lectura de empresas realizada con éxito',
            data: companies,
        });
    }
}

export default CompanyController;
