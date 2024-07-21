import { Request, Response } from 'express';
import Role from '../../data/models/Role';
import { IRoleService } from '../../interfaces/IRoleService';

class RoleController {
    private roleService: IRoleService;

    constructor(roleService: IRoleService) {
        this.roleService = roleService;
    }

    public async createRole(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        const roleToCreate = Role.build({
            name,
        });

        const newRole = await this.roleService.createRole(roleToCreate);

        res.status(201).json({
            message: 'Rol creado con éxito',
            role: newRole,
        });
    }

    public async getRole(req: Request, res: Response): Promise<void> {
        let id = parseInt(req.params.id, 10);
        const role = await this.roleService.getRole(id);

        res.status(200).json({
            message: 'Lectura de rol realizada con éxito',
            role: role,
        });
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        let id = parseInt(req.params.id, 10);
        const roleWasDeleted = await this.roleService.deleteRole(id);

        if (roleWasDeleted)
            res.status(200).json({
                message: 'Rol eliminado con éxito',
            });
    }

    public async getRoles(req: Request, res: Response): Promise<void> {
        const roles = await this.roleService.getRoles();

        res.status(200).json({
            message: 'Lectura de roles realizada con éxito',
            role: roles,
        });
    }
}

export default RoleController;
