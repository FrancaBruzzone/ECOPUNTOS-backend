import { Role } from '../data/models/enumerations/Role';

export function isValidRole(roleName: string): roleName is Role {
    return Object.values(Role).includes(roleName as Role);
}

export function addRoleToUser(userRoles: Role[], newRole: Role): Role[] {
    if (!userRoles.includes(newRole)) userRoles.push(newRole);

    return userRoles;
}

export function removeRoleFromUser(
    userRoles: Role[],
    roleToRemove: Role,
): Role[] {
    return userRoles.filter((role) => role !== roleToRemove);
}
