/**
 * Form model for creating a new category.
 *
 * @interface ICreateCategoryCredentials
 * @property {string} contentTypeId - Parent content type UUID (required)
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} slug - URL-friendly identifier (required)
 * @property {string} description - Category description (required, max 300 chars)
 * @property {boolean} isFree - Whether the category is free (required)
 */
export interface ICreateCategoryCredentials {
    contentTypeId: string;
    name: string;
    slug: string;
    description: string;
    isFree: boolean;
}
