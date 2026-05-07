/**
 * Form model for updating an article's tags.
 *
 * @interface IUpdateArticleTagsCredentials
 * @property {string[]} tagIds - List of tag identifiers to associate with the article
 */
export interface IUpdateArticleTagsCredentials {
    tagIds: string[];
}
