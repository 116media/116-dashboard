import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Change password response entity.
 *
 * @interface IChangePasswordResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a change password request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface IChangePasswordResponse extends IActionResponse {}
