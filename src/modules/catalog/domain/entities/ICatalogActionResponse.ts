import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for catalog action operations.
 *
 * @interface ICatalogActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from catalog
 * actions that return a simple success indicator
 * (e.g., remove pricing, remove slot). Extends IActionResponse
 * for the shared `isSuccess` field.
 */
export interface ICatalogActionResponse extends IActionResponse {}
