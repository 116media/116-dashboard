import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";

/**
 * Domain entity for a commissioned content item within an order.
 *
 * @interface IOrderItemEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {CoreContentType} contentKind - Content type (Article, Video, Short, Custom)
 * @property {boolean} isArticleType - True when the item is for an Article
 * @property {boolean} isVideoType - True when the item is for a Video
 * @property {string} categoryName - Display name of the content category
 * @property {string | null} promotionLevelName - Display name of the promotion level
 * @property {number | null} promoPriceUsd - Promotion price snapshot in USD
 * @property {boolean} socialBoost - Whether social boost is enabled
 * @property {boolean} isBonus - Whether this item is a bonus (no charge)
 * @property {IItemTierEntity[]} tiers - Attached pricing tier snapshots
 */
export interface IOrderItemEntity {
    id: string;
    contentKind: CoreContentType;
    isArticleType: boolean;
    isVideoType: boolean;
    categoryId: string;
    categoryName: string;
    promotionLevelId?: string | null;
    promotionLevelName?: string | null;
    promoPriceUsd?: number | null;
    socialBoost: boolean;
    isBonus: boolean;
    tiers: IItemTierEntity[];
}
