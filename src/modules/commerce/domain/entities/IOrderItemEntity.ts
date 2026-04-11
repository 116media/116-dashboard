import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a commissioned content item within an order.
 *
 * @interface IOrderItemEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {EnumCoreContentType} contentKind - Type of content commissioned
 * @property {string} categoryName - Display name of the content category
 * @property {string | null} promotionLevelName - Display name of the promotion level
 * @property {number | null} promoPriceUsd - Promotion price snapshot in USD
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isBonus - Whether this item is a bonus (no charge)
 * @property {IItemTierEntity[]} tiers - Attached pricing tier snapshots
 */
export interface IOrderItemEntity {
    id: string;
    contentKind: EnumCoreContentType;
    categoryName: string;
    promotionLevelName?: string | null;
    promoPriceUsd?: number | null;
    socialBoost: boolean;
    isBonus: boolean;
    tiers: IItemTierEntity[];
}
