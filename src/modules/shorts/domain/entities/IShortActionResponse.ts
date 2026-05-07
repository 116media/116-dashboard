import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for short video action operations.
 *
 * @interface IShortActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from short video
 * actions (activate, deactivate, delete). Extends IActionResponse
 * for the shared `isSuccess` field.
 */
export interface IShortActionResponse extends IActionResponse {}
