import { NextFunction, Request, Response } from 'express';
import { ICustomRequest } from '../interfaces/ICustomRequest';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
        return res
            .status(401)
            .json({ message: 'Token de autorización no provisto' });

    try {
        (req as ICustomRequest).token = token;
        return next();
    } catch (error) {
        return res
            .status(403)
            .json({ message: 'Token de autorización inválido' });
    }
}
