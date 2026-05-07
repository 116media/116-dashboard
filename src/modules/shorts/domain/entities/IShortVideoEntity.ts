/**
 * Domain entity for a short video.
 *
 * @interface IShortVideoEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} title - Short video display title
 * @property {string} slug - URL-safe slug
 * @property {string} videoUrl - URL of the short video
 * @property {string | null} thumbnailUrl - URL of the video thumbnail
 * @property {boolean} hasFullVideo - Whether a full video file exists
 * @property {boolean} isActive - Whether the short video is currently active
 * @property {number} viewCount - Total number of views
 * @property {number} likeCount - Total number of likes
 * @property {number} shareCount - Total number of shares
 * @property {number} bookmarkCount - Total number of bookmarks
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IShortVideoEntity {
    id: string;
    title: string;
    slug: string;
    videoUrl: string;
    thumbnailUrl?: string | null;
    hasFullVideo: boolean;
    isActive: boolean;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    bookmarkCount: number;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
