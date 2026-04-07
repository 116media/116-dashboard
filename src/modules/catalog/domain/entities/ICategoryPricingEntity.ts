/**
 * Domain entity for a category pricing tier configuration.
 *
 * @interface ICategoryPricingEntity
 *
 * @property {string} tierId - Pricing tier UUID
 * @property {string} tierName - Display name of the pricing tier
 * @property {number} priceUsd - Price in USD for this tier within the category
 */
export interface ICategoryPricingEntity {
    tierId: string;
    tierName: string;
    priceUsd: number;
}
