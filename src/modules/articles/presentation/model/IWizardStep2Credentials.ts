/**
 * Form credentials for article creation wizard step 2 (content).
 *
 * @interface IWizardStep2Credentials
 * @property {string} headline - Article summary (max 500 chars)
 * @property {string} body - Rich text HTML content
 * @property {string} [coverImageUrl] - Optional cover image URL
 */
export interface IWizardStep2Credentials {
    headline: string;
    body: string;
    coverImageUrl?: string;
}
