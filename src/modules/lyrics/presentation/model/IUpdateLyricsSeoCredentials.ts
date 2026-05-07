/**
 * Form model for updating lyrics SEO metadata.
 *
 * @interface IUpdateLyricsSeoCredentials
 * @property {string} metaTitle - SEO meta title (required, max 70 chars)
 * @property {string} metaDescription - SEO meta description (required, max 160 chars)
 * @property {string} [metaKeywords] - SEO meta keywords (optional, max 250 chars)
 */
export interface IUpdateLyricsSeoCredentials {
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
}
