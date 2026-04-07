/**
 * Form model for adding a pricing tier to a category.
 *
 * @interface IAddCategoryPricingCredentials
 * @property {string} pricingTierId - Pricing tier identifier (required)
 * @property {number} priceUsd - Price in USD (required)
 */
export interface IAddCategoryPricingCredentials {
    pricingTierId: string;
    priceUsd: number;
}
