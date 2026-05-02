import type { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";

/**
 * Form model for editing a content item within a draft order.
 *
 * @interface IEditItemCredentials
 * @property {CoreContentType} [contentKind] - Content type (e.g. Article, Video)
 * @property {string} [categoryId] - Category UUID to reassign
 * @property {string | null} [promotionLevelId] - Promotion level UUID (null to unset)
 * @property {boolean} [socialBoost] - Whether social boost is enabled
 * @property {boolean} [isBonus] - Whether the item is a bonus
 */
export interface IEditItemCredentials {
    contentKind?: CoreContentType;
    categoryId?: string;
    promotionLevelId?: string | null;
    socialBoost?: boolean;
    isBonus?: boolean;
}
