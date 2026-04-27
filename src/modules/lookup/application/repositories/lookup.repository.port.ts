import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { Result } from "@/shared/domain/results/result";

/**
 * Repository port (interface) for lookup resource operations.
 *
 * @description
 * Defines the contract for content-type, pricing-tier,
 * promotion-level, and tag data access. All methods return
 * `Result<T>` — errors are represented as typed `Failure` values.
 */
export interface ILookupRepositoryPort {
    /**
     * Fetches all content types.
     *
     * @returns {Promise<Result<IContentTypeEntity[]>>} `ok(IContentTypeEntity[])` on success, `err(Failure)` on failure
     */
    getAllContentTypes(search?: string): Promise<Result<IContentTypeEntity[]>>;

    /**
     * Creates a new content type.
     *
     * @param {object} data - Content type creation payload
     * @param {string} data.name - Content type name
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    createContentType(data: { name: string }): Promise<Result<IContentTypeEntity>>;

    /**
     * Updates an existing content type.
     *
     * @param {string} id - Content type UUID
     * @param {object} data - Fields to update
     * @param {string} data.name - Updated content type name
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    updateContentType(id: string, data: { name: string }): Promise<Result<IContentTypeEntity>>;

    /**
     * Activates an inactive content type.
     *
     * @param {string} id - Content type UUID
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    activateContentType(id: string): Promise<Result<IContentTypeEntity>>;

    /**
     * Deactivates an active content type.
     *
     * @param {string} id - Content type UUID
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    deactivateContentType(id: string): Promise<Result<IContentTypeEntity>>;

    /**
     * Fetches all pricing tiers.
     *
     * @returns {Promise<Result<IPricingTierEntity[]>>} `ok(IPricingTierEntity[])` on success, `err(Failure)` on failure
     */
    getAllPricingTiers(search?: string): Promise<Result<IPricingTierEntity[]>>;

    /**
     * Creates a new pricing tier.
     *
     * @param {object} data - Pricing tier creation payload
     * @param {string} data.name - Pricing tier name
     * @param {string} [data.description] - Optional description
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    createPricingTier(data: {
        name: string;
        description?: string;
    }): Promise<Result<IPricingTierEntity>>;

    /**
     * Updates an existing pricing tier.
     *
     * @param {string} id - Pricing tier UUID
     * @param {object} data - Fields to update
     * @param {string} data.name - Updated pricing tier name
     * @param {string} [data.description] - Updated description
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    updatePricingTier(
        id: string,
        data: { name: string; description?: string }
    ): Promise<Result<IPricingTierEntity>>;

    /**
     * Activates an inactive pricing tier.
     *
     * @param {string} id - Pricing tier UUID
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    activatePricingTier(id: string): Promise<Result<IPricingTierEntity>>;

    /**
     * Deactivates an active pricing tier.
     *
     * @param {string} id - Pricing tier UUID
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    deactivatePricingTier(id: string): Promise<Result<IPricingTierEntity>>;

    /**
     * Fetches all promotion levels.
     *
     * @returns {Promise<Result<IPromotionLevelEntity[]>>} `ok(IPromotionLevelEntity[])` on success, `err(Failure)` on failure
     */
    getAllPromotionLevels(search?: string): Promise<Result<IPromotionLevelEntity[]>>;

    /**
     * Creates a new promotion level.
     *
     * @param {object} data - Promotion level creation payload
     * @param {string} data.name - Promotion level name
     * @param {number} data.durationDays - Duration in days
     * @param {number} data.priceUsd - Price in USD
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    createPromotionLevel(data: {
        name: string;
        durationDays: number;
        priceUsd: number;
    }): Promise<Result<IPromotionLevelEntity>>;

    /**
     * Updates an existing promotion level.
     *
     * @param {string} id - Promotion level UUID
     * @param {object} data - Fields to update
     * @param {string} data.name - Updated promotion level name
     * @param {number} data.durationDays - Updated duration in days
     * @param {number} data.priceUsd - Updated price in USD
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    updatePromotionLevel(
        id: string,
        data: { name: string; durationDays: number; priceUsd: number }
    ): Promise<Result<IPromotionLevelEntity>>;

    /**
     * Activates an inactive promotion level.
     *
     * @param {string} id - Promotion level UUID
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    activatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>>;

    /**
     * Deactivates an active promotion level.
     *
     * @param {string} id - Promotion level UUID
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    deactivatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>>;

    /**
     * Fetches all tags.
     *
     * @returns {Promise<Result<ITagEntity[]>>} `ok(ITagEntity[])` on success, `err(Failure)` on failure
     */
    getAllTags(search?: string): Promise<Result<ITagEntity[]>>;

    /**
     * Creates a new tag.
     *
     * @param {object} data - Tag creation payload
     * @param {string} data.name - Tag name
     * @param {string} data.slug - URL-friendly identifier
     * @returns {Promise<Result<ITagEntity>>} `ok(ITagEntity)` on success, `err(Failure)` on failure
     */
    createTag(data: { name: string; slug: string }): Promise<Result<ITagEntity>>;

    /**
     * Updates an existing tag's name and slug.
     *
     * @param {string} id - Tag UUID
     * @param {object} data - Update payload
     * @returns {Promise<Result<ITagEntity>>} `ok(ITagEntity)` on success, `err(Failure)` on failure
     */
    updateTag(id: string, data: { name: string; slug: string }): Promise<Result<ITagEntity>>;

    /**
     * Permanently deletes a tag.
     *
     * @param {string} id - Tag UUID
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok` on success, `err(Failure)` on failure
     */
    deleteTag(id: string): Promise<Result<{ isSuccess: boolean }>>;
}
