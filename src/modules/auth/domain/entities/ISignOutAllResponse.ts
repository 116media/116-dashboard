/**
 * Sign out all response entity returned after signing out from all devices.
 *
 * @interface ISignOutAllResponse
 *
 * @description
 * Domain entity representing the response from a sign out all request.
 *
 * @property {boolean} isSuccess - Whether the sign out from all devices was successful
 */
export interface ISignOutAllResponse {
    isSuccess: boolean;
}
