import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Forgot password response entity returned after requesting password reset.
 *
 * @interface IForgotPasswordResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a forgot password request.
 * Extends IActionResponse for the shared `isSuccess` field.
 *
 * @property {string} email - The email address the reset link was sent to
 */
export interface IForgotPasswordResponse extends IActionResponse {
    email: string;
}
