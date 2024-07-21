import { Attributes, WhereOptions } from 'sequelize';
import { injectable } from 'tsyringe';
import Company from '../models/Company';
import { ICompanyRepository } from '../../interfaces/ICompanyRepository';

@injectable()
export class CompanyRepository implements ICompanyRepository {
    public async create(company: Company): Promise<Company> {
        return await Company.create({
            name: company.name,
        });
    }

    public async findById(id: number): Promise<Company | null> {
        const entity = await Company.findByPk(id);
        return entity;
    }

    public async findByName(name: string): Promise<Company | null> {
        const role = await Company.findOne({ where: { name } });
        return role;
    }

    public async delete(id: number): Promise<boolean> {
        const whereOptions: WhereOptions<Attributes<Company>> = {
            where: { id } as any,
        };
        const result = await Company.destroy(whereOptions);
        return result > 0;
    }

    public async getAll(): Promise<Company[]> {
        const entities = await Company.findAll();
        return entities;
    }
}
