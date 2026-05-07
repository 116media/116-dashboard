import type { IActionResponse } from "@/shared/domain/types/action.response";

/**
 * Response entity for commerce action operations.
 *
 * @interface ICommerceActionResponse
 * @extends {IActionResponse}
 *
 * @description
 * Domain entity representing the response from commerce
 * actions that return a simple success indicator
 * (e.g., submit order, cancel order, verify/reject payment,
 * remove item, remove tier). Extends IActionResponse for the
 * shared `isSuccess` field.
 */
export interface ICommerceActionResponse extends IActionResponse {}
