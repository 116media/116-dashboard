/**
 * Form model for updating an existing category.
 *
 * @interface IUpdateCategoryCredentials
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} description - Category description (required, max 300 chars)
 *
 * @remarks
 * The `slug` is auto-generated from the name on the backend.
 */
export interface IUpdateCategoryCredentials {
    name: string;
    description: string;
}
