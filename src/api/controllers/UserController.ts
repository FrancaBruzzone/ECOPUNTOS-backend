import { Request, Response } from 'express';
import User from '../../data/models/User';
import { IUserService } from '../../interfaces/IUserService';

class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const userToCreate = User.build({
            email,
            password,
        });

        const newUser = await this.userService.create(userToCreate);

        res.status(201).json({
            message: 'Usuario creado con éxito',
            data: newUser,
        });
    }
}

export default UserController;
