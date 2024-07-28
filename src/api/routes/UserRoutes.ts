import { Request, Router } from 'express';
import UserController from '../controllers/UserController';
import { IUserService } from '../../interfaces/IUserService';
import { checkToken } from '../../middlewares/checkToken';
import { ICustomRequest } from '../../interfaces/ICustomRequest';

const router = Router();

router.post('/users', async (req, res) => {
    const userService: IUserService = req.app.get('userService');
    const userController = new UserController(userService);
    return userController.create(req, res);
});

router.post('/login', async (req, res) => {
    const userService: IUserService = req.app.get('userService');
    const userController = new UserController(userService);
    return userController.login(req, res);
});

router.post('/logout', checkToken, async (req: Request, res) => {
    const customReq = req as ICustomRequest;
    const userService: IUserService = req.app.get('userService');
    const userController = new UserController(userService);
    return userController.logout(customReq, res);
});

export default router;
