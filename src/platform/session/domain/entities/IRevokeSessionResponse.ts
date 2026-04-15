import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Revoke session response entity.
 *
 * @interface IRevokeSessionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from a revoke session request.
 * Extends IActionResponse for the shared `isSuccess` field.
 */
export interface IRevokeSessionResponse extends IActionResponse {}
