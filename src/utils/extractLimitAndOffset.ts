import { Request } from 'express';
import { InvalidElementError } from '../exceptions/InvalidElementError';

interface PaginationParams {
    limit: number;
    offset: number;
}

export function extractLimitAndOffset(req: Request): PaginationParams {
    let limitValue =
        req.query.limit ?? process.env.PAGINATION_DEFAULT_RECORD_LIMIT;
    let limit = Number(Array.isArray(limitValue) ? limitValue[0] : limitValue);

    if (isNaN(limit)) {
        throw new InvalidElementError(
            "El parámetro 'limit' debe ser un número.",
        );
    }

    let offsetValue =
        req.query.offset ?? process.env.PAGINATION_DEFAULT_RECORD_OFFSET;
    let offset = Number(
        Array.isArray(offsetValue) ? offsetValue[0] : offsetValue,
    );

    if (isNaN(offset)) {
        throw new InvalidElementError(
            "El parámetro 'offset' debe ser un número.",
        );
    }

    const maxLimit = Number(process.env.PAGINATION_DEFAULT_MAX_RECORD_LIMIT);
    const maxLimitValue = isNaN(maxLimit) ? 500 : maxLimit;

    if (limit < 0 || limit > maxLimitValue)
        throw new InvalidElementError(`El límite máximo es ${maxLimitValue}.`);

    return { limit, offset };
}
