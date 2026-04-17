/**
 * Form model for updating an article's SEO metadata.
 *
 * @interface IUpdateArticleSeoCredentials
 * @property {string} metaTitle - SEO meta title (required, max 70 chars)
 * @property {string} metaDescription - SEO meta description (required, max 160 chars)
 */
export interface IUpdateArticleSeoCredentials {
    metaTitle: string;
    metaDescription: string;
}
