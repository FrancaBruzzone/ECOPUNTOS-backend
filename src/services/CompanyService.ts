import { inject, injectable } from 'tsyringe';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import Company from '../data/models/Company';
import { ICompanyService } from '../interfaces/ICompanyService';
import { ICompanyRepository } from '../interfaces/ICompanyRepository';

@injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
    ) {}

    public async create(company: Company): Promise<Company> {
        const existingCompany = await this.companyRepository.findByName(
            company.name,
        );

        if (existingCompany)
            throw new ConflictError(`La empresa ${company.name} ya existe`);

        return await this.companyRepository.create(company);
    }

    public async get(id: number): Promise<Company> {
        const existingCompany = await this.companyRepository.findById(id);

        if (!existingCompany)
            throw new NotFoundError(`La empresa con Id ${id} no existe`);

        return existingCompany;
    }

    public async delete(id: number): Promise<boolean> {
        const existingCompany = await this.companyRepository.findById(id);

        if (!existingCompany)
            throw new NotFoundError(`La empresa con Id ${id} no existe`);

        return await this.companyRepository.delete(id);
    }

    public async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }
}
