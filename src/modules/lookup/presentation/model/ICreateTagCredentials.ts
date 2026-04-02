/**
 * Form model for creating a new tag.
 *
 * @interface ICreateTagCredentials
 * @property {string} name - Tag display name (required, max 50 chars)
 * @property {string} slug - URL-friendly identifier (lowercase, hyphens)
 */
export interface ICreateTagCredentials {
    name: string;
    slug: string;
}
