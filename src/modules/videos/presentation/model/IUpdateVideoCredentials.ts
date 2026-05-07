/**
 * Form model for updating an existing video.
 *
 * @interface IUpdateVideoCredentials
 * @property {string} categoryId - Category the video belongs to (required)
 * @property {string} title - Video title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {string} description - Video description (required)
 * @property {string | null} [customerId] - Optional customer who owns the video
 * @property {string | null} [orderItemId] - Optional order item linked to the video
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isFeatured - Whether the video is featured
 * @property {string | null} [featuredUntil] - Optional ISO date until which the video is featured
 * @property {string | null} [metaTitle] - Optional SEO meta title
 * @property {string | null} [metaDescription] - Optional SEO meta description
 */
export interface IUpdateVideoCredentials {
    categoryId: string;
    title: string;
    slug: string;
    description: string;
    customerId?: string | null;
    orderItemId?: string | null;
    socialBoost: boolean;
    isFeatured: boolean;
    featuredUntil?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}
