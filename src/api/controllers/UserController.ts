import { Request, Response } from 'express';
import User from '../../data/models/User';
import { IUserService } from '../../interfaces/IUserService';
import { ICustomRequest } from '../../interfaces/ICustomRequest';

class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const userToCreate = User.build({
                email,
                password,
            });

            const newUser = await this.userService.create(userToCreate);

            res.status(201).json({
                message: 'Usuario creado con éxito',
                data: newUser,
            });
        } catch {
            res.status(400).json({
                message: 'Faltan datos obligatorios',
            });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: 'Faltan datos obligatorios',
            });
        } else {
            const token = await this.userService.login(email, password);

            res.status(200).json({
                message: 'Usuario autenticado con éxito',
                data: token,
            });
        }
    }

    public async logout(req: ICustomRequest, res: Response): Promise<void> {
        await this.userService.logout(req.token);

        res.status(200).json({
            message: 'Sesión finalizada con éxito',
        });
    }
}

export default UserController;
