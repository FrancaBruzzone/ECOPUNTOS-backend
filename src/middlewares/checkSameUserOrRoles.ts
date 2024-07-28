import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ICustomRequest } from '../interfaces/ICustomRequest';
import { Role } from '../data/models/enumerations/Role';

export function checkSameUserOrRoles(requiredRoles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const token = (req as ICustomRequest).token;

        if (!token)
            return res
                .status(401)
                .json({ message: 'Token de autorización no provisto' });

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            if (decoded.userEmail === req.params.email) return next();

            const userRolesNames = decoded.userRolesNames || [];
            const hasRequiredRole = requiredRoles.some((role) =>
                userRolesNames.includes(role),
            );

            if (hasRequiredRole) return next();

            return res.status(403).json({
                message: 'No tiene permiso para acceder a este recurso',
            });
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Token inválido o expirado' });
        }
    };
}
