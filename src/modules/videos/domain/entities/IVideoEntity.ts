import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a full video detail view.
 *
 * @interface IVideoEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} categoryId - Associated category UUID
 * @property {string} categoryName - Display name of the category
 * @property {string} title - Video display title
 * @property {string} slug - URL-safe slug
 * @property {string} description - Video description text (max 2000 chars)
 * @property {string | null} thumbnailUrl - URL of the video thumbnail
 * @property {string | null} thumbnailStorageKey - Storage key for the thumbnail asset
 * @property {string} authorId - UUID of the author (identity user)
 * @property {EnumContentStatus} status - Current editorial workflow status
 * @property {string | null} rejectionReason - Reason for rejection, if rejected
 * @property {string | null} youtubeVideoUrl - YouTube video identifier
 * @property {boolean} isFeatured - Whether the video is featured
 * @property {string | null} featuredUntil - ISO timestamp for featured expiry
 * @property {boolean} hasLyrics - Whether the video has associated lyrics
 * @property {string | null} shootingScheduledAt - ISO timestamp for scheduled shoot
 * @property {string | null} publishedAt - ISO timestamp of publication
 * @property {string | null} metaTitle - SEO meta title
 * @property {string | null} metaDescription - SEO meta description
 * @property {string | null} customerId - UUID of the B2B customer, null for free content
 * @property {string | null} customerName - Full name of the B2B customer, null for free content
 * @property {string | null} orderItemId - UUID of the linked order item, null for free content
 * @property {ITagEntity[]} tags - Assigned tags
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IVideoEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    description: string;
    thumbnailUrl?: string | null;
    thumbnailStorageKey?: string | null;
    authorId: string;
    status: EnumContentStatus;
    rejectionReason?: string | null;
    youtubeVideoUrl?: string | null;
    isFeatured: boolean;
    featuredUntil?: string | null;
    hasLyrics: boolean;
    shootingScheduledAt?: string | null;
    publishedAt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    customerId?: string | null;
    customerName?: string | null;
    orderItemId?: string | null;
    tags: ITagEntity[];
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
