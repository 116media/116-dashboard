import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { ILookupActionResponse } from "@/modules/lookup/domain/entities/ILookupActionResponse";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { ICreateContentTypeCredentials } from "@/modules/lookup/presentation/model/ICreateContentTypeCredentials";
import type { ICreatePricingTierCredentials } from "@/modules/lookup/presentation/model/ICreatePricingTierCredentials";
import type { ICreatePromotionLevelCredentials } from "@/modules/lookup/presentation/model/ICreatePromotionLevelCredentials";
import type { ICreateTagCredentials } from "@/modules/lookup/presentation/model/ICreateTagCredentials";
import type { IUpdateContentTypeCredentials } from "@/modules/lookup/presentation/model/IUpdateContentTypeCredentials";
import type { IUpdatePricingTierCredentials } from "@/modules/lookup/presentation/model/IUpdatePricingTierCredentials";
import type { IUpdatePromotionLevelCredentials } from "@/modules/lookup/presentation/model/IUpdatePromotionLevelCredentials";
import type { IUpdateTagCredentials } from "@/modules/lookup/presentation/model/IUpdateTagCredentials";
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
     * @param {ICreateContentTypeCredentials} data - Content type creation payload
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    createContentType(data: ICreateContentTypeCredentials): Promise<Result<IContentTypeEntity>>;

    /**
     * Updates an existing content type.
     *
     * @param {string} id - Content type UUID
     * @param {IUpdateContentTypeCredentials} data - Fields to update
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    updateContentType(
        id: string,
        data: IUpdateContentTypeCredentials
    ): Promise<Result<IContentTypeEntity>>;

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
     * @param {ICreatePricingTierCredentials} data - Pricing tier creation payload
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    createPricingTier(data: ICreatePricingTierCredentials): Promise<Result<IPricingTierEntity>>;

    /**
     * Updates an existing pricing tier.
     *
     * @param {string} id - Pricing tier UUID
     * @param {IUpdatePricingTierCredentials} data - Fields to update
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    updatePricingTier(
        id: string,
        data: IUpdatePricingTierCredentials
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
     * @param {ICreatePromotionLevelCredentials} data - Promotion level creation payload
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    createPromotionLevel(
        data: ICreatePromotionLevelCredentials
    ): Promise<Result<IPromotionLevelEntity>>;

    /**
     * Updates an existing promotion level.
     *
     * @param {string} id - Promotion level UUID
     * @param {IUpdatePromotionLevelCredentials} data - Fields to update
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    updatePromotionLevel(
        id: string,
        data: IUpdatePromotionLevelCredentials
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
    createTag(data: ICreateTagCredentials): Promise<Result<ITagEntity>>;

    /**
     * Updates an existing tag's name and slug.
     *
     * @param {string} id - Tag UUID
     * @param {object} data - Update payload
     * @returns {Promise<Result<ITagEntity>>} `ok(ITagEntity)` on success, `err(Failure)` on failure
     */
    updateTag(id: string, data: IUpdateTagCredentials): Promise<Result<ITagEntity>>;

    /**
     * Permanently deletes a tag.
     *
     * @param {string} id - Tag UUID
     * @returns {Promise<Result<ILookupActionResponse>>} `ok` on success, `err(Failure)` on failure
     */
    deleteTag(id: string): Promise<Result<ILookupActionResponse>>;
}
