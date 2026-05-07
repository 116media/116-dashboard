import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Resend OTP response entity returned after requesting a new OTP.
 *
 * @interface IResendOtpResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a resend OTP request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface IResendOtpResponse extends IActionResponse {}
