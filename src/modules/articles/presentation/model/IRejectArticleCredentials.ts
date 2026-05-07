/**
 * Form model for rejecting an article.
 *
 * @interface IRejectArticleCredentials
 * @property {string} rejectionReason - Reason for rejecting the article (required, max 500 chars)
 */
export interface IRejectArticleCredentials {
    rejectionReason: string;
}
