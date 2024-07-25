import 'reflect-metadata';
import { Sequelize } from 'sequelize';
import User from '../../data/models/User';
import { getSequelizeInstance } from '../../data/config/sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../../services/UserService';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { IUserSessionRepository } from '../../interfaces/IUserSessionRepository';
import { ConflictError } from '../../exceptions/ConflictError';
import { InvalidCredentialsError } from '../../exceptions/InvalidCredentialsError';
import { NotFoundError } from '../../exceptions/NotFoundError';
import UserSession from '../../data/models/UserSession';
import { jest } from '@jest/globals';

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('UserService', () => {
    let sequelize: Sequelize;
    let userService: UserService;
    let userRepository: jest.Mocked<IUserRepository>;
    let userSessionRepository: jest.Mocked<IUserSessionRepository>;

    beforeAll(async () => {
        sequelize = getSequelizeInstance();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        userRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        } as any;

        userSessionRepository = {
            create: jest.fn(),
            findBySessionId: jest.fn(),
            delete: jest.fn(),
        } as any;

        userService = new UserService(userRepository, userSessionRepository);
        await User.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            // Arrange
            const userData = {
                email: 'test@example.com',
                password: 'password',
                name: 'John',
                surname: 'Doe',
                gender: 'Male',
                birthdate: new Date('1990-01-01'),
                profilePicture: 'profile.jpg',
                isActive: true,
            };
            const userToCreate = User.build(userData);

            userRepository.findByEmail.mockResolvedValue(null);
            userRepository.create.mockResolvedValue(userToCreate as any);

            // Act
            const newUser = await userService.create(userToCreate);

            // Assert
            expect(newUser.email).toBe(userData.email);
            expect(userRepository.findByEmail).toHaveBeenCalledWith(
                userData.email,
            );
            expect(userRepository.create).toHaveBeenCalledWith(userToCreate);
        });

        it('should throw ConflictError if user with the same email already exists', async () => {
            // Arrange
            const userData = {
                email: 'test@example.com',
                password: 'password',
                name: 'John',
                isActive: true,
            };
            const existingUser = User.build(userData);

            userRepository.findByEmail.mockResolvedValue(existingUser as any);

            // Act & Assert
            await expect(
                userService.create(User.build(userData)),
            ).rejects.toThrow(ConflictError);
        });
    });

    describe('login', () => {
        it('should throw NotFoundError if user does not exist', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'password';

            userRepository.findByEmail.mockResolvedValue(null);

            // Act & Assert
            await expect(userService.login(email, password)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw InvalidCredentialsError for invalid password', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'password';
            const user = User.build({
                email,
                password: 'hashed-password',
                name: 'John',
                isActive: true,
            });

            userRepository.findByEmail.mockResolvedValue(user as any);

            // Act & Assert
            await expect(userService.login(email, password)).rejects.toThrow(
                InvalidCredentialsError,
            );
        });
    });

    describe('logout', () => {
        it('should invalidate the user session with a valid token', async () => {
            // Arrange
            const token = 'valid-token';
            const sessionId = 'mock-session-id';
            const payload = { id: 1, email: 'test@example.com', sessionId };

            (jwt.verify as jest.Mock).mockReturnValue(payload);

            const userSession = UserSession.build({
                id: 1,
                sessionId,
                isEnabled: true,
            });
            userSessionRepository.findBySessionId.mockResolvedValue(
                userSession as any,
            );
            userSessionRepository.delete.mockResolvedValue(true);

            // Act
            const result = await userService.logout(token);

            // Assert
            expect(result).toBe(true);
            expect(userSessionRepository.findBySessionId).toHaveBeenCalledWith(
                sessionId,
            );
            expect(userSessionRepository.delete).toHaveBeenCalledWith(
                userSession,
            );
        });

        it('should throw NotFoundError if session does not exist', async () => {
            // Arrange
            const token = 'valid-token';
            const payload = {
                id: 1,
                email: 'test@example.com',
                sessionId: 'non-existent-session-id',
            };

            (jwt.verify as jest.Mock).mockReturnValue(payload);

            userSessionRepository.findBySessionId.mockResolvedValue(null);

            // Act & Assert
            await expect(userService.logout(token)).rejects.toThrow(
                NotFoundError,
            );
        });

        it('should throw InvalidCredentialsError for invalid token', async () => {
            // Arrange
            const token = 'invalid-token';

            jest.spyOn(jwt, 'verify').mockImplementation(() => {
                throw new Error('Invalid token');
            });

            // Act & Assert
            await expect(userService.logout(token)).rejects.toThrow(
                InvalidCredentialsError,
            );
        });
    });
});
