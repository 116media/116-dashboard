/**
 * Form model for attaching a YouTube video ID to a video.
 *
 * @interface IAttachYoutubeIdCredentials
 * @property {string} youtubeVideoId - YouTube video identifier (required, max 20 chars)
 */
export interface IAttachYoutubeIdCredentials {
    youtubeVideoId: string;
}
