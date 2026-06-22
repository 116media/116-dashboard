import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import type {
    CategoryDto,
    CategoryPricingDto,
    CustomerDto,
    PackageDto,
    PackageSlotDto
} from "@/shared/infrastructure/api/generated/116.api";
import { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Mapper for converting API DTOs to domain entities in the catalog module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities. Handles nested object mappings
 * for pricing tiers within categories and slots within packages.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const CatalogMapper = {
    /**
     * Maps CategoryPricingDto to ICategoryPricingEntity domain entity.
     *
     * @param {CategoryPricingDto} dto - Category pricing data from API
     * @returns {ICategoryPricingEntity} Mapped category pricing entity
     */
    categoryPricingFromDto(dto: CategoryPricingDto): ICategoryPricingEntity {
        return {
            tierId: dto.tierId,
            tierName: dto.tierName,
            priceUsd: dto.priceUsd
        };
    },

    /**
     * Maps CategoryDto to ICategoryEntity domain entity.
     *
     * @param {CategoryDto} dto - Category data from API
     * @returns {ICategoryEntity} Mapped category entity with nested pricing tiers
     */
    categoryFromDto(dto: CategoryDto): ICategoryEntity {
        return {
            id: dto.id,
            contentTypeId: dto.contentTypeId,
            contentTypeName: dto.contentTypeName,
            isVideoType: dto.contentTypeName === EnumCoreContentType.Video,
            isArticleType: dto.contentTypeName === EnumCoreContentType.Article,
            isShortType: dto.contentTypeName === EnumCoreContentType.Short,
            isCustomType: dto.contentTypeName === EnumCoreContentType.Custom,
            name: dto.name,
            slug: dto.slug,
            description: dto.description,
            isFree: dto.isFree,
            isActive: dto.isActive,
            isGossip: dto.isGossip,
            isExclusive: dto.isExclusive,
            isPinnedToFeed: dto.isPinnedToFeed,
            pinnedToFeedAt: dto.pinnedToFeedAt ?? null,
            posterUrl: dto.posterUrl ?? null,
            pricing: dto.pricing.map(CatalogMapper.categoryPricingFromDto)
        };
    },

    /**
     * Maps CustomerDto to ICustomerEntity domain entity.
     *
     * @param {CustomerDto} dto - Customer data from API
     * @returns {ICustomerEntity} Mapped customer entity with audit timestamps
     */
    customerFromDto(dto: CustomerDto): ICustomerEntity {
        return {
            id: dto.id,
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone,
            company: dto.company,
            notes: dto.notes,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps PackageSlotDto to IPackageSlotEntity domain entity.
     *
     * @param {PackageSlotDto} dto - Package slot data from API
     * @returns {IPackageSlotEntity} Mapped package slot entity
     */
    packageSlotFromDto(dto: PackageSlotDto): IPackageSlotEntity {
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            isRequired: dto.isRequired,
            quantity: dto.quantity
        };
    },

    /**
     * Maps PackageDto to IPackageEntity domain entity.
     *
     * @param {PackageDto} dto - Package data from API
     * @returns {IPackageEntity} Mapped package entity with nested slots
     */
    packageFromDto(dto: PackageDto): IPackageEntity {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            calculatedPriceUsd: dto.calculatedPriceUsd,
            isActive: dto.isActive,
            slots: dto.slots.map(CatalogMapper.packageSlotFromDto),
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
