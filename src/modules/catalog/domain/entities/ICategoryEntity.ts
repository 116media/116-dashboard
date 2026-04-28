import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";

/**
 * Domain entity for a content category.
 *
 * @interface ICategoryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} contentTypeId - Associated content type UUID
 * @property {string} contentTypeName - Display name of the content type
 * @property {string} name - Category display name
 * @property {string} slug - URL-safe slug
 * @property {boolean} isFree - Whether content in this category is free
 * @property {boolean} isActive - Whether the category is currently active
 * @property {ICategoryPricingEntity[]} pricing - Configured pricing tiers
 */
export interface ICategoryEntity {
    id: string;
    contentTypeId: string;
    contentTypeName: string;
    name: string;
    slug: string;
    description: string;
    isFree: boolean;
    isActive: boolean;
    pricing: ICategoryPricingEntity[];
}
