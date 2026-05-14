/**
 * Form model for updating an existing category.
 *
 * @interface IUpdateCategoryCredentials
 * @property {string} name - Category name (required, max 80 chars)
 * @property {string} slug - URL-friendly identifier (required)
 * @property {string} description - Category description (required, max 300 chars)
 * @property {boolean} [isGossip] - Whether this is the gossip fallback source (article categories only)
 */
export interface IUpdateCategoryCredentials {
    name: string;
    slug: string;
    description: string;
    isGossip: boolean;
}
