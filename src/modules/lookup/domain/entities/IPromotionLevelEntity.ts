/**
 * Domain entity for a promotion level lookup value.
 *
 * @interface IPromotionLevelEntity
 *
 * @description
 * Represents a promotion level that defines duration and pricing
 * for promoted content. Mapped from PromotionLevelDto via the
 * lookup mapper. Does not include audit fields.
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Promotion level name
 * @property {number} durationDays - Duration of the promotion in days
 * @property {number} priceUsd - Price in USD for this promotion level
 * @property {boolean} isActive - Whether the promotion level is currently active
 */
export interface IPromotionLevelEntity {
    id: string;
    name: string;
    durationDays: number;
    priceUsd: number;
    isActive: boolean;
}
