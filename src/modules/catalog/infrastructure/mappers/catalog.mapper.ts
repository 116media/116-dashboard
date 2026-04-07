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

/**
 * Maps catalog DTOs from the generated API to domain entities.
 */
export const CatalogMapper = {
    categoryPricingFromDto(dto: CategoryPricingDto): ICategoryPricingEntity {
        return {
            tierId: dto.tierId,
            tierName: dto.tierName,
            priceUsd: dto.priceUsd
        };
    },

    categoryFromDto(dto: CategoryDto): ICategoryEntity {
        return {
            id: dto.id,
            contentTypeId: dto.contentTypeId,
            contentTypeName: dto.contentTypeName,
            name: dto.name,
            slug: dto.slug,
            description: dto.description,
            isFree: dto.isFree,
            isActive: dto.isActive,
            pricing: dto.pricing.map(CatalogMapper.categoryPricingFromDto)
        };
    },

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

    packageSlotFromDto(dto: PackageSlotDto): IPackageSlotEntity {
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            isRequired: dto.isRequired,
            quantity: dto.quantity
        };
    },

    packageFromDto(dto: PackageDto): IPackageEntity {
        return {
            id: dto.id,
            name: dto.name,
            description: dto.description,
            flatPriceUsd: dto.flatPriceUsd,
            isActive: dto.isActive,
            slots: dto.slots.map(CatalogMapper.packageSlotFromDto),
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
