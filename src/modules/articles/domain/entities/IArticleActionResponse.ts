import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for article workflow and bulk operations.
 *
 * @interface IArticleActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from article workflow
 * transitions (submit, approve, publish, reject, archive),
 * deletion, and tag updates. Extends IActionResponse for the
 * shared `isSuccess` field.
 */
export interface IArticleActionResponse extends IActionResponse {}
