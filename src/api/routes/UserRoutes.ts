import { Router } from 'express';
import UserController from '../controllers/UserController';
import { IUserService } from '../../interfaces/IUserService';

const router = Router();

router.post('/users', async (req, res) => {
    const userService: IUserService = req.app.get('userService');
    const userController = new UserController(userService);
    return userController.create(req, res);
});

export default router;
