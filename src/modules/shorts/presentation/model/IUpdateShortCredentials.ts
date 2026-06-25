/**
 * Form model for updating a short video's metadata.
 *
 * @interface IUpdateShortCredentials
 * @property {string} title - Short video title (required)
 * @property {string} [videoId] - Optional linked parent video UUID
 *
 * @description
 * The video file is replaced separately via the dedicated upload endpoint
 * (see IUploadShortVideoCredentials); it is never part of the metadata update.
 */
export interface IUpdateShortCredentials {
    title: string;
    videoId?: string;
}
