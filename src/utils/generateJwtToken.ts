import jwt from 'jsonwebtoken';
import User from '../data/models/User';
import UserSession from '../data/models/UserSession';

export async function generateJwtToken(
    user: User,
    userSession: UserSession,
): Promise<string> {
    const roles = await user.$get('roles');

    const payload = {
        userId: user.id,
        userEmail: user.email,
        userSessionId: userSession.sessionId,
        userRolesNames: Array.isArray(roles)
            ? roles.map((role) => role.name)
            : [],
        userPointsBalancesIds: Array.isArray(user.pointsBalances)
            ? user.pointsBalances.map((balance) => balance.id)
            : [],
        userExchangesIds: Array.isArray(user.exchanges)
            ? user.exchanges.map((exchange) => exchange.id)
            : [],
        userOffersIds: Array.isArray(user.offers)
            ? user.offers.map((offer) => offer.id)
            : [],
        userSustainabilityActivitiesIds: Array.isArray(
            user.sustainabilityActivities,
        )
            ? user.sustainabilityActivities.map((activity) => activity.id)
            : [],
        userCompaniesIds: Array.isArray(user.companies)
            ? user.companies.map((company) => company.id)
            : [],
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}
