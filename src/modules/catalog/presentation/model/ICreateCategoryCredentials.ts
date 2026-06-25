/**
 * Form model for creating a new category.
 *
 * @interface ICreateCategoryCredentials
 * @property {string} contentTypeId - Parent content type UUID (required)
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} slug - URL-friendly identifier (required)
 * @property {string} description - Category description (required, max 300 chars)
 * @property {boolean} isFree - Whether the category is free (required)
 * @property {boolean} [isGossip] - Whether this is the gossip fallback source (article categories only)
 * @property {boolean} isExclusive - Whether to mark the category as the exclusive show (video categories only, defaults to false)
 */
export interface ICreateCategoryCredentials {
    contentTypeId: string;
    name: string;
    slug: string;
    description: string;
    isFree: boolean;
    isGossip: boolean;
    isExclusive: boolean;
}
