/**
 * Form model for creating a new pricing tier.
 *
 * @interface ICreatePricingTierCredentials
 * @property {string} name - Pricing tier name (required, max 50 chars)
 * @property {string} description - Description of the pricing tier (required, max 300 chars)
 */
export interface ICreatePricingTierCredentials {
    name: string;
    description: string;
}
