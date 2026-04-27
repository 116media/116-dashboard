/**
 * Form model for creating a new package.
 *
 * @interface ICreatePackageCredentials
 * @property {string} name - Package name (required, max 100 chars)
 * @property {string} description - Package description (required, max 500 chars)
 */
export interface ICreatePackageCredentials {
    name: string;
    description: string;
}
