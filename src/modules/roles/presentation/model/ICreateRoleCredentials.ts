/**
 * Form model for creating a new role.
 *
 * @interface ICreateRoleCredentials
 * @property {string} name - Role name (required, max 20 chars)
 * @property {string} description - Role description (required, max 300 chars)
 */
export interface ICreateRoleCredentials {
    name: string;
    description: string;
}
