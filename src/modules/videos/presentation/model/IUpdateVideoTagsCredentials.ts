/**
 * Form model for updating a video's tags.
 *
 * @interface IUpdateVideoTagsCredentials
 * @property {string[]} tagNames - List of tag display names to associate with the video.
 * The backend upserts each name: existing tags are reused by slug lookup,
 * new tags are auto-created with a unique slug.
 */
export interface IUpdateVideoTagsCredentials {
    tagNames: string[];
}
