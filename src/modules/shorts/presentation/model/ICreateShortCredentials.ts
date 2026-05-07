/**
 * Form model for creating a new short video.
 *
 * @interface ICreateShortCredentials
 * @property {string} title - Short video title (required)
 * @property {string} slug - URL-friendly slug (required)
 * @property {File} videoFile - Video file to upload (required)
 * @property {string} [videoId] - Optional existing video identifier
 */
export interface ICreateShortCredentials {
    title: string;
    slug: string;
    videoFile: File;
    videoId?: string;
}
