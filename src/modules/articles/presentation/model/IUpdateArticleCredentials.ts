import type { Dayjs } from "dayjs";

/**
 * Form model for updating an existing article.
 *
 * @interface IUpdateArticleCredentials
 * @property {string} categoryId - Category the article belongs to (required)
 * @property {string} title - Article title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {string} headline - Short headline or subtitle (required)
 * @property {string} body - Full article body content (required)
 * @property {string | null} [coverImageUrl] - Optional cover image URL
 * @property {string | null} [customerId] - Optional customer who owns the article
 * @property {string | null} [orderItemId] - Optional order item linked to the article
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isFeatured - Whether the article is featured
 * @property {Dayjs | string | null} [featuredUntil] - Optional date until which the article is featured
 * @property {string | null} [metaTitle] - Optional SEO meta title
 * @property {string | null} [metaDescription] - Optional SEO meta description
 */
export interface IUpdateArticleCredentials {
    categoryId: string;
    title: string;
    slug: string;
    headline: string;
    body: string;
    coverImageUrl?: string | null;
    customerId?: string | null;
    orderItemId?: string | null;
    socialBoost: boolean;
    isFeatured: boolean;
    featuredUntil?: Dayjs | string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}
