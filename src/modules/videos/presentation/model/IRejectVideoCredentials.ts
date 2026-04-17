/**
 * Form model for rejecting a video.
 *
 * @interface IRejectVideoCredentials
 * @property {string} rejectionReason - Reason for rejecting the video (required, max 500 chars)
 */
export interface IRejectVideoCredentials {
    rejectionReason: string;
}
