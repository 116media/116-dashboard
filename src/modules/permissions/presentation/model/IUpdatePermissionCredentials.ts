/**
 * Form model for updating an existing permission.
 *
 * @interface IUpdatePermissionCredentials
 * @property {string} [resource] - Updated resource name
 * @property {string} [action] - Updated action name
 * @property {string} [description] - Updated description
 */
export interface IUpdatePermissionCredentials {
    resource?: string;
    action?: string;
    description?: string;
}
