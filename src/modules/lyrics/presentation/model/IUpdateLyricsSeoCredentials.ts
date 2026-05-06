/**
 * Form model for updating lyrics SEO metadata.
 *
 * @interface IUpdateLyricsSeoCredentials
 * @property {string} metaTitle - SEO meta title (required, max 70 chars)
 * @property {string} metaDescription - SEO meta description (required, max 160 chars)
 */
export interface IUpdateLyricsSeoCredentials {
    metaTitle: string;
    metaDescription: string;
}
