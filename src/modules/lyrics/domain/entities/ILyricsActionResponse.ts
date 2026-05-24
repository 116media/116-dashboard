import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for lyrics action operations.
 *
 * @interface ILyricsActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from lyrics
 * actions (delete). Extends IActionResponse for the shared
 * `isSuccess` field.
 */
export interface ILyricsActionResponse extends IActionResponse {}
