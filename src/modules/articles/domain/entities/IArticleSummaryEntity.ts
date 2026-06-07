import type { ContentStatus } from "@/shared/domain/enums/content-status.enum";

/**
 * Domain entity for an article summary in list views.
 *
 * @interface IArticleSummaryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} categoryId - Associated category UUID
 * @property {string} categoryName - Display name of the category
 * @property {string} title - Article display title
 * @property {string} slug - URL-safe slug
 * @property {string} headline - Short summary text
 * @property {string | null} coverImageUrl - URL of the cover image
 * @property {string} authorId - UUID of the author (identity user)
 * @property {ContentStatus} status - Current editorial workflow status
 * @property {boolean} canDelete - Whether the article can be permanently deleted
 * @property {boolean} canSubmit - Whether the article can be submitted for review
 * @property {boolean} canApprove - Whether the article can be approved
 * @property {boolean} canPublish - Whether the article can be published
 * @property {boolean} canReject - Whether the article can be rejected
 * @property {boolean} canArchive - Whether the article can be archived
 * @property {boolean} isPromoted - Whether the article has an active paid promotion
 * @property {string | null} publishedAt - ISO timestamp of publication
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IArticleSummaryEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    headline: string;
    coverImageUrl?: string | null;
    authorId: string;
    status: ContentStatus;
    canDelete: boolean;
    canSubmit: boolean;
    canApprove: boolean;
    canPublish: boolean;
    canReject: boolean;
    canArchive: boolean;
    isPromoted: boolean;
    publishedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
