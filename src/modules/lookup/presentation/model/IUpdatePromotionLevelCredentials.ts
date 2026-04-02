/**
 * Form model for updating an existing promotion level.
 *
 * @interface IUpdatePromotionLevelCredentials
 * @property {string} name - Promotion level name (required, max 50 chars)
 * @property {number} durationDays - Duration of the promotion in days (required)
 * @property {number} priceUsd - Price in USD for this promotion level (required)
 */
export interface IUpdatePromotionLevelCredentials {
    name: string;
    durationDays: number;
    priceUsd: number;
}
