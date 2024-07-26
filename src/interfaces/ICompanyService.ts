import Company from '../data/models/Company';

export interface ICompanyService {
    create(company: Company): Promise<Company>;
    get(id: number): Promise<Company>;
    delete(id: number): Promise<boolean>;
    getAll(): Promise<Company[]>;
}
