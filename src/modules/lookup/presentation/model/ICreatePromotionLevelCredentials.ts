/**
 * Form model for creating a new promotion level.
 *
 * @interface ICreatePromotionLevelCredentials
 * @property {string} name - Promotion level name (required, max 50 chars)
 * @property {number} durationDays - Duration of the promotion in days (required)
 * @property {number} priceUsd - Price in USD for this promotion level (required)
 * @property {number | null} spotPriority - Homepage grid spot (1, 2, or 3). Optional.
 */
export interface ICreatePromotionLevelCredentials {
    name: string;
    durationDays: number;
    priceUsd: number;
    spotPriority?: number | null;
}
