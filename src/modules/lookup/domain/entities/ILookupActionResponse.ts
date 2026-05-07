import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for lookup action operations.
 *
 * @interface ILookupActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from lookup
 * actions that return a simple success indicator
 * (e.g., delete tag). Extends IActionResponse for the
 * shared `isSuccess` field.
 */
export interface ILookupActionResponse extends IActionResponse {}
