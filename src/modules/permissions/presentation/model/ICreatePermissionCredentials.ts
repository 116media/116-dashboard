/**
 * Form model for creating a new permission.
 *
 * @interface ICreatePermissionCredentials
 * @property {string} resource - Resource name (required, max 15 chars)
 * @property {string} action - Action name (required, max 15 chars)
 * @property {string} description - Permission description (required, max 300 chars)
 */
export interface ICreatePermissionCredentials {
    resource: string;
    action: string;
    description: string;
}
