import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Sign out all response entity returned after signing out from all devices.
 *
 * @interface ISignOutAllResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a sign out all request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface ISignOutAllResponse extends IActionResponse {}
