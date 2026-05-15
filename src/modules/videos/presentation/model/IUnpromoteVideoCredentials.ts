/**
 * Form model for force-unpromoting a video.
 *
 * @interface IUnpromoteVideoCredentials
 * @property {string} reason - Justification for removing the promotion (required)
 */
export interface IUnpromoteVideoCredentials {
    reason: string;
}
