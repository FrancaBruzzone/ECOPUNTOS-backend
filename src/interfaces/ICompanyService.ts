import Company from '../data/models/Company';
import { IPaginationResponse } from './IPaginationResponse';

export interface ICompanyService {
    create(company: Company): Promise<Company>;
    get(id: number): Promise<Company>;
    delete(id: number): Promise<boolean>;
    getAll(filters: any): Promise<IPaginationResponse<Company>>;
}
