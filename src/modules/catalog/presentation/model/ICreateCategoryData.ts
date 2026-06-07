/**
 * Form model for the data payload when creating a new category.
 *
 * @interface ICreateCategoryData
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} slug - URL-friendly identifier (required)
 * @property {string} description - Category description (required, max 300 chars)
 * @property {boolean} isFree - Whether the category is free (required)
 */
export interface ICreateCategoryData {
    name: string;
    slug: string;
    description: string;
    isFree: boolean;
    isGossip: boolean;
}
