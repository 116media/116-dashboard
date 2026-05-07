import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for video workflow and bulk operations.
 *
 * @interface IVideoActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from video workflow
 * transitions (submit, approve, publish, reject, archive),
 * deletion, and tag updates. Extends IActionResponse for the
 * shared `isSuccess` field.
 */
export interface IVideoActionResponse extends IActionResponse {}
