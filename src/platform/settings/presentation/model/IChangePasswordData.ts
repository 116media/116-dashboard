/**
 * Form model for the change password API payload.
 *
 * @interface IChangePasswordData
 * @property {string} oldPassword - The user's current password
 * @property {string} newPassword - The desired new password
 */
export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}
