import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Sign out response entity returned after successfully signing out.
 *
 * @interface ISignOutResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a sign out request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface ISignOutResponse extends IActionResponse {}
