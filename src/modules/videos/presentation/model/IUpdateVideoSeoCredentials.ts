/**
 * Form model for updating a video's SEO metadata.
 *
 * @interface IUpdateVideoSeoCredentials
 * @property {string} metaTitle - SEO meta title (required, max 70 chars)
 * @property {string} metaDescription - SEO meta description (required, max 160 chars)
 */
export interface IUpdateVideoSeoCredentials {
    metaTitle: string;
    metaDescription: string;
}
