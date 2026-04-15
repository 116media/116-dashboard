import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Reset password response entity returned after successfully resetting password.
 *
 * @interface IResetPasswordResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a reset password request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface IResetPasswordResponse extends IActionResponse {}
