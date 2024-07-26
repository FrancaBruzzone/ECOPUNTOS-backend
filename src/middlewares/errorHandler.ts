import { NextFunction, Request, Response } from 'express';
import { ConflictError } from '../exceptions/ConflictError';

function messageFormat(error: Error) {
    let errorMessage = { message: error.message };

    return errorMessage;
}

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let message = messageFormat(error);

    if (error instanceof ConflictError) {
        return res.status(409).json(message);
    } else {
        return res.status(500).json('Error interno de servidor');
    }
}
