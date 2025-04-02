/**
 * Update account credentials model.
 *
 * @interface IUpdateAccountCredentials
 *
 * @description
 * Presentation layer model for the account info edit form data.
 * The `countryFlag`, `phoneISOCode`, and `phoneDialCode` fields are
 * derived from the selected country object on submit, not from
 * separate form fields.
 *
 * @property {string} email - User's email address (display-only, not sent to API)
 * @property {string} userName - User's display name
 * @property {string | null} [countryName] - Selected country name
 * @property {string | null} [countryFlag] - Country flag URL (derived from country)
 * @property {string | null} [phonePartial] - Phone number without dial code
 * @property {string | null} [phoneISOCode] - Country ISO code (derived from country)
 * @property {string | null} [phoneDialCode] - Country dial code (derived from country)
 */
export interface IUpdateAccountCredentials {
    email: string;
    userName: string;
    countryName?: string | null;
    countryFlag?: string | null;
    phonePartial?: string | null;
    phoneISOCode?: string | null;
    phoneDialCode?: string | null;
}
