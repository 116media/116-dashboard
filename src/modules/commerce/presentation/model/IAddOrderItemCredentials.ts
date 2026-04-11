import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Form model for adding a content item to an order.
 *
 * @interface IAddOrderItemCredentials
 * @property {EnumCoreContentType} contentKind - Type of content
 * @property {string} categoryId - Content category UUID
 * @property {string} [promotionLevelId] - Optional promotion level UUID
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isBonus - Whether the item is a bonus (no charge)
 */
export interface IAddOrderItemCredentials {
    contentKind: EnumCoreContentType;
    categoryId: string;
    promotionLevelId?: string | null;
    socialBoost: boolean;
    isBonus: boolean;
}
