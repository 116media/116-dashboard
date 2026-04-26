/**
 * Form model for creating a new pricing tier.
 *
 * @interface ICreatePricingTierCredentials
 * @property {string} name - Pricing tier name (required, max 50 chars)
 * @property {string} [description] - Optional description of the pricing tier (max 300 chars)
 */
export interface ICreatePricingTierCredentials {
    name: string;
    description?: string;
}
