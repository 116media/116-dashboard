/**
 * Domain entity for a pricing tier lookup value.
 *
 * @interface IPricingTierEntity
 *
 * @description
 * Represents a pricing tier used to define content pricing levels.
 * Mapped from PricingTierDto via the lookup mapper.
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Pricing tier name
 * @property {string} description - Description of the pricing tier
 * @property {boolean} isActive - Whether the pricing tier is currently active
 * @property {string | null} createdAt - ISO 8601 creation timestamp
 * @property {string | null} updatedAt - ISO 8601 last update timestamp
 * @property {string | null} createdBy - Creator identifier
 * @property {string | null} updatedBy - Last updater identifier
 */
export interface IPricingTierEntity {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
