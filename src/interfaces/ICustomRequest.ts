import { Request } from 'express';

export interface ICustomRequest extends Request {
    userId: number;
    userEmail: string;
    userRolesNames: string[];
    userPointsBalancesIds: number[];
    userExchangesIds: number[];
    userSessionsIds: string[];
    userOffersIds: number[];
    userSustainabilityActivitiesIds: number[];
    userCompaniesIds: number[];
    token: string;
}
