import Company from '../data/models/Company';

export interface ICompanyRepository {
    create(company: Company): Promise<Company>;
    findById(id: number): Promise<Company | null>;
    findByName(name: string): Promise<Company | null>;
    delete(id: number): Promise<boolean>;
    getAll(filters: any): Promise<Company[]>;
    getCount(): Promise<number>;
}
