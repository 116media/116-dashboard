import type { IUser } from "./IUser";

/**
 * Authentication response entity returned after successful login.
 *
 * @interface IAuthResponse
 *
 * @description
 * Domain entity representing the authenticated user's state.
 * The access token is delivered via HttpOnly cookies and is not
 * accessible to JavaScript.
 *
 * @property {IUser} user - Authenticated user's profile and authorization data
 */
export interface IAuthResponse {
    user: IUser;
}
