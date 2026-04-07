/**
 * Form model for creating a new category.
 *
 * @interface ICreateCategoryCredentials
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} description - Category description (required, max 300 chars)
 * @property {boolean} isFree - Whether the category is free (required)
 *
 * @remarks
 * The `contentTypeId` is passed separately (e.g. as a route param).
 * The `slug` is auto-generated from the name on the backend.
 */
export interface ICreateCategoryCredentials {
    contentTypeId: string;
    name: string;
    description: string;
    isFree: boolean;
}
