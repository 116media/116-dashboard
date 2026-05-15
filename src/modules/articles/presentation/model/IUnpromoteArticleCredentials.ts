/**
 * Form model for force-unpromoteing an article.
 *
 * @interface IUnpromoteArticleCredentials
 * @property {string} reason - Justification for removing the promotion (required)
 */
export interface IUnpromoteArticleCredentials {
    reason: string;
}
