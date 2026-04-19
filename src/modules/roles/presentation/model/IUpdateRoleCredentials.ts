/**
 * Form model for updating an existing role.
 *
 * @interface IUpdateRoleCredentials
 * @property {string} [name] - Updated role name
 * @property {string} [description] - Updated role description
 */
export interface IUpdateRoleCredentials {
    name?: string;
    description?: string;
}
