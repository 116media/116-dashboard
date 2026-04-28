/**
 * Form model for updating an existing pricing tier.
 *
 * @interface IUpdatePricingTierCredentials
 * @property {string} name - Pricing tier name (required, max 50 chars)
 * @property {string} description - Description of the pricing tier (required, max 300 chars)
 */
export interface IUpdatePricingTierCredentials {
    name: string;
    description: string;
}
