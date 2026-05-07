import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a full article detail view.
 *
 * @interface IArticleEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} categoryId - Associated category UUID
 * @property {string} categoryName - Display name of the category
 * @property {string} title - Article display title
 * @property {string} slug - URL-safe slug
 * @property {string} headline - Short summary text (max 500 chars)
 * @property {string} body - Rich text HTML content
 * @property {string | null} coverImageUrl - URL of the cover image
 * @property {string} authorId - UUID of the author (identity user)
 * @property {EnumContentStatus} status - Current editorial workflow status
 * @property {string | null} rejectionReason - Reason for rejection, if rejected
 * @property {boolean} isFeatured - Whether the article is featured
 * @property {string | null} featuredUntil - ISO timestamp for featured expiry
 * @property {string | null} publishedAt - ISO timestamp of publication
 * @property {string | null} metaTitle - SEO meta title
 * @property {string | null} metaDescription - SEO meta description
 * @property {IArticleImageEntity[]} images - Uploaded article images
 * @property {ITagEntity[]} tags - Assigned tags
 * @property {number} readTimeInMinutes - Estimated reading time
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IArticleEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    headline: string;
    body: string;
    coverImageUrl?: string | null;
    authorId: string;
    status: EnumContentStatus;
    rejectionReason?: string | null;
    isFeatured: boolean;
    featuredUntil?: string | null;
    publishedAt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    images: IArticleImageEntity[];
    tags: ITagEntity[];
    readTimeInMinutes: number;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
