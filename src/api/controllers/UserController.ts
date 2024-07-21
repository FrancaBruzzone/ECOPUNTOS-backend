import { Request, Response } from 'express';
import User from '../../data/models/User';
import { IUserService } from '../../interfaces/IUserService';

class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const userToCreate = User.build({
                email,
                password,
            });

            const newUser = await this.userService.createUser(userToCreate);

            res.status(201).json({
                message: 'Usuario creado con éxito',
                account: newUser,
            });
        } catch (error: any) {
            res.status(500).json({
                message: 'Error al crear usuario',
                error: error.message,
            });
        }
    }
}

export default UserController;
