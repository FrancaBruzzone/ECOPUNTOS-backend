import { Sequelize } from 'sequelize';
import User from '../../data/models/User';
import { getSequelizeInstance } from '../../data/config/sequelize';
import bcrypt from 'bcrypt';

describe('User Model', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = getSequelizeInstance();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

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

        // Act
        const user = await User.create(userData);

        // Assert
        expect(user.id).toBeDefined();
        expect(user.email).toBe(userData.email);
        expect(user.name).toBe(userData.name);
        expect(user.surname).toBe(userData.surname);
        expect(user.gender).toBe(userData.gender);
        expect(user.birthdate?.getTime()).toBe(userData.birthdate.getTime());
        expect(user.profilePicture).toBe(userData.profilePicture);
        expect(user.isActive).toBe(userData.isActive);
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
    });

    it('should hash password before saving', async () => {
        // Arrange
        const userData = {
            email: 'test@example.com',
            password: 'password',
            name: 'John',
            isActive: true,
        };

        // Act
        const user = await User.create(userData);

        // Assert
        expect(user.password).not.toBe(userData.password);

        await user.save();
        const isMatch = await bcrypt.compare(userData.password, user.password);
        expect(isMatch).toBe(true);
    });

    it('should compare passwords correctly', async () => {
        // Arrange
        const userData = {
            email: 'test@example.com',
            password: 'password',
            name: 'John',
            isActive: true,
        };

        // Act
        const user = await User.create(userData);

        // Assert
        const isMatch = await user.comparePassword('password');
        expect(isMatch).toBe(true);

        const isNotMatch = await user.comparePassword('wrongpassword');
        expect(isNotMatch).toBe(false);
    });

    it('should have availablePoints property', () => {
        // Arrange
        const userData = {
            email: 'test@example.com',
            password: 'password',
            name: 'John',
            isActive: true,
        };

        // Act
        const user = User.build(userData);

        // Assert
        expect(user.availablePoints).toBe(0);
    });
});
