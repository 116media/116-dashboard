import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for catalog resource operations.
 *
 * @description
 * Defines the contract for category, customer, and package data access.
 * All methods return `Result<T>` for typed error handling.
 */
export interface ICatalogRepositoryPort {
    getAllCategories(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        isFree?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICategoryEntity>>>;

    getCategoryById(id: string): Promise<Result<ICategoryEntity>>;

    createCategory(
        contentTypeId: string,
        data: { name: string; slug: string; description: string; isFree: boolean }
    ): Promise<Result<ICategoryEntity>>;

    updateCategory(
        id: string,
        data: { name: string; slug: string; description: string }
    ): Promise<Result<ICategoryEntity>>;

    activateCategory(id: string): Promise<Result<ICategoryEntity>>;

    deactivateCategory(id: string): Promise<Result<ICategoryEntity>>;

    addCategoryPricing(
        categoryId: string,
        data: { pricingTierId: string; priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>>;

    updateCategoryPricing(
        categoryId: string,
        pricingId: string,
        data: { priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>>;

    removeCategoryPricing(
        categoryId: string,
        pricingId: string
    ): Promise<Result<{ isSuccess: boolean }>>;

    getAllCustomers(params: {
        pageIndex: number;
        pageSize: number;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICustomerEntity>>>;

    getCustomerById(id: string): Promise<Result<ICustomerEntity>>;

    createCustomer(data: {
        fullName: string;
        email: string;
        phone?: string;
        company?: string;
        notes?: string;
    }): Promise<Result<ICustomerEntity>>;

    updateCustomer(
        id: string,
        data: { fullName: string; phone?: string; company?: string; notes?: string }
    ): Promise<Result<ICustomerEntity>>;

    getAllPackages(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPackageEntity>>>;

    getPackageById(id: string): Promise<Result<IPackageEntity>>;

    createPackage(data: {
        name: string;
        description?: string;
        flatPriceUsd: number;
    }): Promise<Result<IPackageEntity>>;

    activatePackage(id: string): Promise<Result<IPackageEntity>>;

    deactivatePackage(id: string): Promise<Result<IPackageEntity>>;

    addPackageSlot(
        packageId: string,
        data: { categoryId: string; isRequired: boolean; quantity: number }
    ): Promise<Result<IPackageSlotEntity>>;

    removePackageSlot(packageId: string, slotId: string): Promise<Result<{ isSuccess: boolean }>>;
}
