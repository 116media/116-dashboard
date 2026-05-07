/**
 * Form model for updating an existing tag.
 *
 * @interface IUpdateTagCredentials
 * @property {string} name - Tag name (required, max 50 chars)
 * @property {string} slug - URL-friendly identifier (required)
 */
export interface IUpdateTagCredentials {
    name: string;
    slug: string;
}
