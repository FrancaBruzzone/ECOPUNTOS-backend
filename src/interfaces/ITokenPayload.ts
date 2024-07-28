export interface ITokenPayload {
    userId: number;
    userEmail: string;
    userSessionId: string;
    userRolesNames: string[];
    userPointsBalancesIds: number[];
    userExchangesIds: number[];
    userOffersIds: number[];
    userSustainabilityActivitiesIds: number[];
    userCompaniesIds: number[];
}
