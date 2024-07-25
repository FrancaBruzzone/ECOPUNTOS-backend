import { NextFunction, Request, Response } from 'express';
import { ConflictError } from '../exceptions/ConflictError';
import { NotFoundError } from '../exceptions/NotFoundError';
import { InvalidCredentialsError } from '../exceptions/InvalidCredentialsError';

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

    if (error instanceof ConflictError) return res.status(409).json(message);
    else if (error instanceof NotFoundError)
        return res.status(400).json(message);
    else if (error instanceof InvalidCredentialsError)
        return res.status(401).json(message);
    else return res.status(500).json('Error interno de servidor');
}
