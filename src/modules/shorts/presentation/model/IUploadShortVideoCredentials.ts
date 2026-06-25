/**
 * Form model for uploading (or replacing) the video file of a short video.
 *
 * @interface IUploadShortVideoCredentials
 * @property {File} file - Video file to upload
 *
 * @description
 * Mirrors IUploadShortThumbnailCredentials. The video file is attached to an existing short
 * video draft via the dedicated upload endpoint, decoupled from create/update.
 */
export interface IUploadShortVideoCredentials {
    file: File;
}
