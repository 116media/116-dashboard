/**
 * Form model for creating a new promotion level.
 *
 * @interface ICreatePromotionLevelCredentials
 * @property {string} name - Promotion level name (required, max 50 chars)
 * @property {number} durationDays - Duration of the promotion in days (required)
 * @property {number} priceUsd - Price in USD for this promotion level (required)
 */
export interface ICreatePromotionLevelCredentials {
    name: string;
    durationDays: number;
    priceUsd: number;
}
