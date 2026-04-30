/**
 * Form model for creating a new video.
 *
 * @interface ICreateVideoCredentials
 * @property {string} categoryId - Category the video belongs to (required)
 * @property {string} title - Video title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {string} description - Video description (required)
 * @property {string} [customerId] - Optional customer who owns the video
 * @property {string} [orderItemId] - Optional order item linked to the video
 * @property {string} [shootingScheduledAt] - Optional ISO date for scheduled shoot
 */
export interface ICreateVideoCredentials {
    categoryId: string;
    title: string;
    slug: string;
    description: string;
    customerId?: string;
    orderItemId?: string;
    shootingScheduledAt?: string;
    socialBoost?: boolean;
}
