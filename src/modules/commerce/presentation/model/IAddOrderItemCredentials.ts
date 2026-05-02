import type { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";

/**
 * Form model for adding a content item to an order.
 *
 * @interface IAddOrderItemCredentials
 * @property {CoreContentType} contentKind - Type of content
 * @property {string} categoryId - Content category UUID
 * @property {string} [promotionLevelId] - Optional promotion level UUID
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isBonus - Whether the item is a bonus (no charge)
 */
export interface IAddOrderItemCredentials {
    contentKind: CoreContentType;
    categoryId: string;
    promotionLevelId?: string | null;
    socialBoost: boolean;
    isBonus: boolean;
}
