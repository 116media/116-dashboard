/**
 * Form model for updating a short video.
 *
 * @interface IUpdateShortCredentials
 * @property {string} title - Short video title (required)
 * @property {string} [videoId] - Optional linked video UUID
 * @property {File} [videoFile] - Optional new video file to replace the existing one
 */
export interface IUpdateShortCredentials {
    title: string;
    videoId?: string;
    videoFile?: File;
}
