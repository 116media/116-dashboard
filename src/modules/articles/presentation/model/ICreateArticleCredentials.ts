/**
 * Form model for creating a new article.
 *
 * @interface ICreateArticleCredentials
 * @property {string} categoryId - Category the article belongs to (required)
 * @property {string} title - Article title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {string} [customerId] - Optional customer who owns the article
 * @property {string} [orderItemId] - Optional order item linked to the article
 */
export interface ICreateArticleCredentials {
    categoryId: string;
    title: string;
    slug: string;
    customerId?: string;
    orderItemId?: string;
}
