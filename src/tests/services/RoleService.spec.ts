import 'reflect-metadata';
import { Sequelize } from 'sequelize';
import { container } from 'tsyringe';
import Role from '../../data/models/Role';
import { getSequelizeInstance } from '../../data/config/sequelize';
import { RoleService } from '../../services/RoleService';
import { IRoleRepository } from '../../interfaces/IRoleRepository';
import { ConflictError } from '../../exceptions/ConflictError';
import { NotFoundError } from '../../exceptions/NotFoundError';
import { RoleRepository } from '../../data/repositories/RoleRepository';

describe('RoleService', () => {
    let sequelize: Sequelize;
    let roleService: RoleService;
    let roleRepository: IRoleRepository;

    beforeAll(async () => {
        sequelize = getSequelizeInstance();
        await sequelize.sync({ force: true });

        container.register<IRoleRepository>('IRoleRepository', {
            useClass: RoleRepository,
        });
    });

    beforeEach(async () => {
        roleRepository = container.resolve<IRoleRepository>('IRoleRepository');
        roleService = new RoleService(roleRepository);
        await Role.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a new role', async () => {
        // Arrange
        const roleData = {
            name: 'ADMIN',
        };

        // Act
        const role = await roleService.create(roleData as Role);

        // Assert
        expect(role.id).toBeDefined();
        expect(role.name).toBe(roleData.name);
    });

    it('should throw ConflictError when creating a role with existing name', async () => {
        // Arrange
        const existingRole = await Role.create({
            name: 'ADMIN',
        });

        const roleData = {
            name: 'ADMIN',
        };

        // Act & Assert
        await expect(roleService.create(roleData as Role)).rejects.toThrow(
            ConflictError,
        );
    });

    it('should get a role by id', async () => {
        // Arrange
        const roleData = {
            name: 'ADMIN',
        };

        const createdRole = await Role.create(roleData);

        // Act
        const fetchedRole = await roleService.get(createdRole.id);

        // Assert
        expect(fetchedRole).toEqual(expect.objectContaining(roleData));
    });

    it('should throw NotFoundError when getting a non-existent role', async () => {
        // Act & Assert
        await expect(roleService.get(999)).rejects.toThrow(NotFoundError);
    });

    it('should delete a role by id', async () => {
        // Arrange
        const roleData = {
            name: 'ADMIN',
        };

        const createdRole = await Role.create(roleData);

        // Act
        const result = await roleService.delete(createdRole.id);

        // Assert
        expect(result).toBe(true);

        // Verify role is deleted
        const fetchedRole = await Role.findByPk(createdRole.id);
        expect(fetchedRole).toBeNull();
    });

    it('should throw NotFoundError when deleting a non-existent role', async () => {
        // Act & Assert
        await expect(roleService.delete(999)).rejects.toThrow(NotFoundError);
    });

    it('should get all roles', async () => {
        // Arrange
        const rolesData = [{ name: 'ADMIN' }, { name: 'USER' }];

        await Role.bulkCreate(rolesData);

        // Act
        const roles = await roleService.getAll();

        // Assert
        expect(roles).toHaveLength(2);
        roles.forEach((role, index) => {
            expect(role.name).toBe(rolesData[index].name);
        });
    });
});
