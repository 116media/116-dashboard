/**
 * Form model for updating a video's tags.
 *
 * @interface IUpdateVideoTagsCredentials
 * @property {string[]} tagIds - List of tag identifiers to associate with the video
 */
export interface IUpdateVideoTagsCredentials {
    tagIds: string[];
}
