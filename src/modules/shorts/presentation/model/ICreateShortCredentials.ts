/**
 * Form model for creating a new short video draft.
 *
 * @interface ICreateShortCredentials
 * @property {string} title - Short video title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {string} [videoId] - Optional parent full video identifier (creates a teaser)
 *
 * @description
 * A short video is created as an inactive draft with no video file. The video file is
 * uploaded separately via the dedicated upload endpoint (see IUploadShortVideoCredentials).
 */
export interface ICreateShortCredentials {
    title: string;
    slug: string;
    videoId?: string;
}
