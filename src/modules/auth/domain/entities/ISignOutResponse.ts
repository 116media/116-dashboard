/**
 * Sign out response entity returned after successfully signing out.
 *
 * @interface ISignOutResponse
 *
 * @description
 * Domain entity representing the response from a sign out request.
 *
 * @property {boolean} isSuccess - Whether the sign out was successful
 */
export interface ISignOutResponse {
    isSuccess: boolean;
}
