import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Form model for editing a content item within a draft order.
 *
 * @interface IEditItemCredentials
 * @property {EnumCoreContentType} [contentKind] - Content type (e.g. Article, Video)
 * @property {string} [categoryId] - Category UUID to reassign
 * @property {string | null} [promotionLevelId] - Promotion level UUID (null to unset)
 * @property {boolean} [socialBoost] - Whether social boost is enabled
 * @property {boolean} [isBonus] - Whether the item is a bonus
 */
export interface IEditItemCredentials {
    contentKind?: EnumCoreContentType;
    categoryId?: string;
    promotionLevelId?: string | null;
    socialBoost?: boolean;
    isBonus?: boolean;
}
