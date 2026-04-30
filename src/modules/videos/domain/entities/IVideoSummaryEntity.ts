import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a video summary in list views.
 *
 * @interface IVideoSummaryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} categoryId - Associated category UUID
 * @property {string} categoryName - Display name of the category
 * @property {string} title - Video display title
 * @property {string} slug - URL-safe slug
 * @property {string | null} thumbnailUrl - URL of the video thumbnail
 * @property {string} authorId - UUID of the author (identity user)
 * @property {EnumContentStatus} status - Current editorial workflow status
 * @property {string | null} youtubeVideoUrl - YouTube video identifier
 * @property {boolean} isFeatured - Whether the video is featured
 * @property {boolean} hasLyrics - Whether the video has associated lyrics
 * @property {string | null} publishedAt - ISO timestamp of publication
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IVideoSummaryEntity {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    slug: string;
    thumbnailUrl?: string | null;
    authorId: string;
    status: EnumContentStatus;
    youtubeVideoUrl?: string | null;
    isFeatured: boolean;
    hasLyrics: boolean;
    publishedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
