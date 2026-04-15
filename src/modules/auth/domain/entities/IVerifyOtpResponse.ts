import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Verify OTP response entity returned after OTP verification.
 *
 * @interface IVerifyOtpResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from an OTP verification request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface IVerifyOtpResponse extends IActionResponse {}
