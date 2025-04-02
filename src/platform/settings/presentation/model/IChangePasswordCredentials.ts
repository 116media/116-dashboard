/**
 * Change password credentials model.
 *
 * @interface IChangePasswordCredentials
 *
 * @description
 * Presentation layer model for the change password form data.
 * The `confirmPassword` field is frontend-only and is not sent to the API.
 *
 * @property {string} oldPassword - The user's current password
 * @property {string} newPassword - The desired new password
 * @property {string} confirmPassword - Confirmation of the new password (frontend-only)
 */
export interface IChangePasswordCredentials {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
