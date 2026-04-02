import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type {
    ContentTypeDto,
    PricingTierDto,
    PromotionLevelDto,
    TagDto
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Maps lookup DTOs from the generated API to domain entities.
 *
 * @description
 * All DTO-to-entity conversion for the lookup module is centralized here.
 * Presentation and domain layers never see raw DTOs.
 */
export const LookupMapper = {
    /**
     * Maps a single ContentTypeDto to an IContentTypeEntity domain entity.
     *
     * @param {ContentTypeDto} dto - The raw DTO from the API response
     * @returns {IContentTypeEntity} The mapped domain entity
     */
    contentTypeFromDto(dto: ContentTypeDto): IContentTypeEntity {
        return {
            id: dto.id,
            name: dto.name,
            isActive: dto.isActive,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps a single PricingTierDto to an IPricingTierEntity domain entity.
     *
     * @param {PricingTierDto} dto - The raw DTO from the API response
     * @returns {IPricingTierEntity} The mapped domain entity
     */
    pricingTierFromDto(dto: PricingTierDto): IPricingTierEntity {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            isActive: dto.isActive,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps a single PromotionLevelDto to an IPromotionLevelEntity domain entity.
     *
     * @param {PromotionLevelDto} dto - The raw DTO from the API response
     * @returns {IPromotionLevelEntity} The mapped domain entity
     */
    promotionLevelFromDto(dto: PromotionLevelDto): IPromotionLevelEntity {
        return {
            id: dto.id,
            name: dto.name,
            durationDays: dto.durationDays,
            priceUsd: dto.priceUsd,
            isActive: dto.isActive
        };
    },

    /**
     * Maps a single TagDto to an ITagEntity domain entity.
     *
     * @param {TagDto} dto - The raw DTO from the API response
     * @returns {ITagEntity} The mapped domain entity
     */
    tagFromDto(dto: TagDto): ITagEntity {
        return {
            id: dto.id,
            name: dto.name,
            slug: dto.slug
        };
    }
} as const;
