/**
 * Form model for attaching a YouTube video URL to a video.
 *
 * @interface IAttachYoutubeUrlCredentials
 * @property {string} youtubeVideoUrl - Full YouTube video URL (required, max 200 chars)
 */
export interface IAttachYoutubeUrlCredentials {
    youtubeVideoUrl: string;
}
