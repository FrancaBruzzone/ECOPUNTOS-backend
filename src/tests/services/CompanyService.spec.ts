import 'reflect-metadata';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';
import Company from '../../data/models/Company';
import { getSequelizeInstance } from '../../data/config/sequelize';
import { CompanyService } from '../../services/CompanyService';
import { ICompanyRepository } from '../../interfaces/ICompanyRepository';
import { ConflictError } from '../../exceptions/ConflictError';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { CompanyRepository } from '../../data/repositories/CompanyRepository';

describe('CompanyService', () => {
    let sequelize: Sequelize;
    let companyService: CompanyService;
    let companyRepository: ICompanyRepository;

    beforeAll(async () => {
        sequelize = getSequelizeInstance();
        await sequelize.sync({ force: true });

        container.register<ICompanyRepository>('ICompanyRepository', {
            useClass: CompanyRepository,
        });
    });

    beforeEach(async () => {
        companyRepository =
            container.resolve<ICompanyRepository>('ICompanyRepository');
        companyService = new CompanyService(companyRepository);
        await Company.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new company', async () => {
        // Arrange
        const companyData = {
            name: 'Test Company',
            isActive: true,
        };

        // Act
        const company = await companyService.create(companyData as Company);

        // Assert
        expect(company.id).toBeDefined();
        expect(company.name).toBe(companyData.name);
        expect(company.isActive).toBe(companyData.isActive);
    });

    it('should throw ConflictError when creating a company with existing name', async () => {
        // Arrange
        const existingCompany = await Company.create({
            name: 'Existing Company',
            isActive: true,
        });

        const companyData = {
            name: 'Existing Company',
            isActive: true,
        };

        // Act & Assert
        await expect(
            companyService.create(companyData as Company),
        ).rejects.toThrow(ConflictError);
    });

    it('should get a company by id', async () => {
        // Arrange
        const companyData = {
            name: 'Test Company',
            isActive: true,
        };

        const createdCompany = await Company.create(companyData);

        // Act
        const fetchedCompany = await companyService.get(createdCompany.id);

        // Assert
        expect(fetchedCompany).toEqual(expect.objectContaining(companyData));
    });

    it('should throw NotFoundError when getting a non-existent company', async () => {
        // Act & Assert
        await expect(companyService.get(999)).rejects.toThrow(NotFoundError);
    });

    it('should delete a company by id', async () => {
        // Arrange
        const companyData = {
            name: 'Test Company',
            isActive: true,
        };

        const createdCompany = await Company.create(companyData);

        // Act
        const result = await companyService.delete(createdCompany.id);

        // Assert
        expect(result).toBe(true);

        // Verify company is deleted
        const fetchedCompany = await Company.findByPk(createdCompany.id);
        expect(fetchedCompany).toBeNull();
    });

    it('should throw NotFoundError when deleting a non-existent company', async () => {
        // Act & Assert
        await expect(companyService.delete(999)).rejects.toThrow(NotFoundError);
    });

    it('should get all companies', async () => {
        // Arrange
        const companiesData = [
            { name: 'Company A', isActive: true },
            { name: 'Company B', isActive: false },
        ];

        await Company.bulkCreate(companiesData);

        // Act
        const response = await companyService.getAll({ limit: 10, offset: 0 });

        // Assert
        expect(response.elements).toHaveLength(2);
        response.elements.forEach((company, index) => {
            expect(company.name).toBe(companiesData[index].name);
            expect(company.isActive).toBe(companiesData[index].isActive);
        });
        expect(response.pagination.total).toBe(2);
        expect(response.pagination.limit).toBe(10);
        expect(response.pagination.offset).toBe(0);
    });
});
