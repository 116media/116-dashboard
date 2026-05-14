import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";

/**
 * Domain entity for a content category.
 *
 * @interface ICategoryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} contentTypeId - Associated content type UUID
 * @property {string} contentTypeName - Display name of the content type
 * @property {boolean} isVideoType - True when the category belongs to the Video content type
 * @property {boolean} isArticleType - True when the category belongs to the Article content type
 * @property {boolean} isShortType - True when the category belongs to the Short content type
 * @property {boolean} isCustomType - True when the category belongs to the Custom content type
 * @property {string} name - Category display name
 * @property {string} slug - URL-safe slug
 * @property {boolean} isFree - Whether content in this category is free
 * @property {boolean} isActive - Whether the category is currently active
 * @property {boolean} isGossip - Whether this is the gossip fallback source for the homepage feed
 * @property {ICategoryPricingEntity[]} pricing - Configured pricing tiers
 */
export interface ICategoryEntity {
    id: string;
    contentTypeId: string;
    contentTypeName: string;
    isVideoType: boolean;
    isArticleType: boolean;
    isShortType: boolean;
    isCustomType: boolean;
    name: string;
    slug: string;
    description: string;
    isFree: boolean;
    isActive: boolean;
    isGossip: boolean;
    pricing: ICategoryPricingEntity[];
}
