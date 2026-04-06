/**
 * Permission entity representing granular access rights.
 *
 * @interface IPermission
 *
 * @description
 * Domain entity for individual permissions assigned to users or roles.
 *
 * Permissions define specific actions users can perform on resources.
 *
 * @property {string} id - Unique permission identifier
 * @property {string} resource - Target resource (e.g., "articles", "users", "analytics")
 * @property {string} action - Allowed action (e.g., "create", "read", "update", "delete")
 * @property {string} description - Permission description for clarity
 */
export interface IPermission {
    id: string;
    resource: string;
    action: string;
    description: string;
    isActive: boolean;
}
