import { Router } from 'express';
import { IRoleService } from '../../interfaces/IRoleService';
import RoleController from '../controllers/RoleController';

const router = Router();

router.post('/roles', async (req, res) => {
    const roleService: IRoleService = req.app.get('roleService');
    const roleController = new RoleController(roleService);
    return roleController.createRole(req, res);
});

router.get('/roles/:id', async (req, res) => {
    const roleService: IRoleService = req.app.get('roleService');
    const roleController = new RoleController(roleService);
    return roleController.getRole(req, res);
});

router.delete('/roles/:id', async (req, res) => {
    const roleService: IRoleService = req.app.get('roleService');
    const roleController = new RoleController(roleService);
    return roleController.deleteRole(req, res);
});

router.get('/roles', async (req, res) => {
    const roleService: IRoleService = req.app.get('roleService');
    const roleController = new RoleController(roleService);
    return roleController.getRoles(req, res);
});

export default router;
