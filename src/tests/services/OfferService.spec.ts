import 'reflect-metadata';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';
import Offer from '../../data/models/Offer';
import { getSequelizeInstance } from '../../data/config/sequelize';
import { OfferService } from '../../services/OfferService';
import { IOfferRepository } from '../../interfaces/IOfferRepository';
import { ConflictError } from '../../exceptions/ConflictError';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { OfferRepository } from '../../data/repositories/OfferRepository';
import User from '../../data/models/User';
import { Role } from '../../data/models/enumerations/Role';

describe('OfferService', () => {
    let sequelize: Sequelize;
    let offerService: OfferService;
    let offerRepository: IOfferRepository;
    let userId: number;

    beforeAll(async () => {
        sequelize = getSequelizeInstance();
        await sequelize.sync({ force: true });

        container.register<IOfferRepository>('IOfferRepository', {
            useClass: OfferRepository,
        });

        const user = await User.create({
            name: 'Test User',
            email: 'testuser1@example.com',
            roles: [Role.Admin],
        });

        userId = user.id;
    });

    beforeEach(async () => {
        offerRepository =
            container.resolve<IOfferRepository>('IOfferRepository');
        offerService = new OfferService(offerRepository);
        await Offer.destroy({ where: {} });
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
        await sequelize.close();
    });

    it('should create a new offer', async () => {
        // Arrange
        const offerData = {
            code: 'FG12345',
            name: 'Merienda para dos personas',
            description:
                'Cupón válido por una merienda para dos personas en locales habilitados',
            stock: 10,
            amount: 100,
            minPointsRequired: 0,
            maxPointsRequired: 500,
            allowsCancelExchange: false,
            userId: userId,
        };

        // Act
        const offer = await offerService.create(offerData as Offer);

        // Assert
        expect(offer.id).toBeDefined();
        expect(offer.code).toBe(offerData.code);
        expect(offer.name).toBe(offerData.name);
        expect(offer.description).toBe(offerData.description);
        expect(offer.stock).toBe(offerData.stock);
        expect(offer.amount).toBe(offerData.amount);
        expect(offer.minPointsRequired).toBe(offerData.minPointsRequired);
        expect(offer.maxPointsRequired).toBe(offerData.maxPointsRequired);
        expect(offer.allowsCancelExchange).toBe(offerData.allowsCancelExchange);
    });

    it('should throw ConflictError when creating an offer with existing code', async () => {
        // Arrange
        await Offer.create({
            code: 'FG12345',
            name: 'Existing Offer',
            description: 'Description',
            stock: 5,
            amount: 50,
            minPointsRequired: 10,
            maxPointsRequired: 100,
            allowsCancelExchange: true,
            userId: userId,
        });

        const offerData = {
            code: 'FG12345',
            name: 'New Offer',
            description: 'New description',
            stock: 10,
            amount: 100,
            minPointsRequired: 0,
            maxPointsRequired: 500,
            allowsCancelExchange: false,
            userId: userId,
        };

        // Act & Assert
        await expect(offerService.create(offerData as Offer)).rejects.toThrow(
            ConflictError,
        );
    });

    it('should get an offer by id', async () => {
        // Arrange
        const offerData = {
            code: 'FG12345',
            name: 'Test Offer',
            description: 'Test description',
            stock: 5,
            amount: 50,
            minPointsRequired: 10,
            maxPointsRequired: 100,
            allowsCancelExchange: true,
            userId: userId,
        };

        const createdOffer = await Offer.create(offerData);

        // Act
        const fetchedOffer = await offerService.get(createdOffer.id);

        // Assert
        expect(fetchedOffer).toEqual(expect.objectContaining(offerData));
    });

    it('should throw NotFoundError when getting a non-existent offer', async () => {
        // Act & Assert
        await expect(offerService.get(999)).rejects.toThrow(NotFoundError);
    });

    it('should get all offers with pagination', async () => {
        // Arrange
        const offersData = [
            {
                code: 'FG12346',
                name: 'Offer A',
                description: 'Description A',
                stock: 10,
                amount: 100,
                minPointsRequired: 0,
                maxPointsRequired: 500,
                allowsCancelExchange: true,
                userId: userId,
            },
            {
                code: 'FG12347',
                name: 'Offer B',
                description: 'Description B',
                stock: 20,
                amount: 200,
                minPointsRequired: 5,
                maxPointsRequired: 300,
                allowsCancelExchange: false,
                userId: userId,
            },
        ];

        await Offer.bulkCreate(offersData);

        // Act
        const response = await offerService.getAll({ limit: 10, offset: 0 });

        // Assert
        expect(response.elements).toHaveLength(2);
        response.elements.forEach((offer, index) => {
            expect(offer.code).toBe(offersData[index].code);
            expect(offer.name).toBe(offersData[index].name);
            expect(offer.description).toBe(offersData[index].description);
            expect(offer.stock).toBe(offersData[index].stock);
            expect(offer.amount).toBe(offersData[index].amount);
            expect(offer.minPointsRequired).toBe(
                offersData[index].minPointsRequired,
            );
            expect(offer.maxPointsRequired).toBe(
                offersData[index].maxPointsRequired,
            );
            expect(offer.allowsCancelExchange).toBe(
                offersData[index].allowsCancelExchange,
            );
        });
        expect(response.pagination.total).toBe(2);
        expect(response.pagination.limit).toBe(10);
        expect(response.pagination.offset).toBe(0);
    });
});
