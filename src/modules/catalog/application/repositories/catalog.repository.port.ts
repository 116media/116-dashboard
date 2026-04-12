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
 * All methods return `Result<T>` — errors are represented as
 * typed `Failure` values, never thrown.
 */
export interface ICatalogRepositoryPort {
    /**
     * Fetches a paginated list of categories with optional filters.
     *
     * @param params - Pagination, active status, free flag, and search filters
     * @returns `ok(IPaginatedResult<ICategoryEntity>)` on success, `err(Failure)` on failure
     */
    getAllCategories(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        isFree?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICategoryEntity>>>;

    /**
     * Fetches a single category by its ID.
     *
     * @param id - The category UUID
     * @returns `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    getCategoryById(id: string): Promise<Result<ICategoryEntity>>;

    /**
     * Creates a new category under the given content type.
     *
     * @param contentTypeId - The parent content type UUID
     * @param data - Category name, slug, description, and free flag
     * @returns `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    createCategory(
        contentTypeId: string,
        data: { name: string; slug: string; description: string; isFree: boolean }
    ): Promise<Result<ICategoryEntity>>;

    /**
     * Updates an existing category's name, slug, and description.
     *
     * @param id - The category UUID
     * @param data - Updated name, slug, and description
     * @returns `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    updateCategory(
        id: string,
        data: { name: string; slug: string; description: string }
    ): Promise<Result<ICategoryEntity>>;

    /**
     * Activates an inactive category.
     *
     * @param id - The category UUID
     * @returns `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    activateCategory(id: string): Promise<Result<ICategoryEntity>>;

    /**
     * Deactivates an active category.
     *
     * @param id - The category UUID
     * @returns `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    deactivateCategory(id: string): Promise<Result<ICategoryEntity>>;

    /**
     * Adds a pricing tier configuration to a category.
     *
     * @param categoryId - The category UUID
     * @param data - Pricing tier ID and price in USD
     * @returns `ok(ICategoryPricingEntity)` on success, `err(Failure)` on failure
     */
    addCategoryPricing(
        categoryId: string,
        data: { pricingTierId: string; priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>>;

    /**
     * Updates the price of an existing category pricing entry.
     *
     * @param categoryId - The category UUID
     * @param pricingId - The pricing entry UUID
     * @param data - Updated price in USD
     * @returns `ok(ICategoryPricingEntity)` on success, `err(Failure)` on failure
     */
    updateCategoryPricing(
        categoryId: string,
        pricingId: string,
        data: { priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>>;

    /**
     * Removes a pricing tier from a category.
     *
     * @param categoryId - The category UUID
     * @param pricingId - The pricing entry UUID to remove
     * @returns `ok({ isSuccess })` on success, `err(Failure)` on failure
     */
    removeCategoryPricing(
        categoryId: string,
        pricingId: string
    ): Promise<Result<{ isSuccess: boolean }>>;

    /**
     * Fetches a paginated list of B2B customers.
     *
     * @param params - Pagination and optional search filter
     * @returns `ok(IPaginatedResult<ICustomerEntity>)` on success, `err(Failure)` on failure
     */
    getAllCustomers(params: {
        pageIndex: number;
        pageSize: number;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICustomerEntity>>>;

    /**
     * Fetches a single customer by their ID.
     *
     * @param id - The customer UUID
     * @returns `ok(ICustomerEntity)` on success, `err(Failure)` on failure
     */
    getCustomerById(id: string): Promise<Result<ICustomerEntity>>;

    /**
     * Creates a new B2B customer.
     *
     * @param data - Customer contact information
     * @returns `ok(ICustomerEntity)` on success, `err(Failure)` on failure
     */
    createCustomer(data: {
        fullName: string;
        email: string;
        phone?: string;
        company?: string;
        notes?: string;
    }): Promise<Result<ICustomerEntity>>;

    /**
     * Updates an existing customer's information.
     *
     * @param id - The customer UUID
     * @param data - Updated customer details
     * @returns `ok(ICustomerEntity)` on success, `err(Failure)` on failure
     */
    updateCustomer(
        id: string,
        data: { fullName: string; phone?: string; company?: string; notes?: string }
    ): Promise<Result<ICustomerEntity>>;

    /**
     * Fetches a paginated list of content packages.
     *
     * @param params - Pagination, active status, and search filters
     * @returns `ok(IPaginatedResult<IPackageEntity>)` on success, `err(Failure)` on failure
     */
    getAllPackages(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPackageEntity>>>;

    /**
     * Fetches a single package by its ID.
     *
     * @param id - The package UUID
     * @returns `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    getPackageById(id: string): Promise<Result<IPackageEntity>>;

    /**
     * Creates a new content package.
     *
     * @param data - Package name, description, and flat price in USD
     * @returns `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    createPackage(data: {
        name: string;
        description: string;
        flatPriceUsd: number;
    }): Promise<Result<IPackageEntity>>;

    /**
     * Activates an inactive package.
     *
     * @param id - The package UUID
     * @returns `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    activatePackage(id: string): Promise<Result<IPackageEntity>>;

    /**
     * Deactivates an active package.
     *
     * @param id - The package UUID
     * @returns `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    deactivatePackage(id: string): Promise<Result<IPackageEntity>>;

    /**
     * Adds a content slot to a package.
     *
     * @param packageId - The package UUID
     * @param data - Slot category, required flag, and quantity
     * @returns `ok(IPackageSlotEntity)` on success, `err(Failure)` on failure
     */
    addPackageSlot(
        packageId: string,
        data: { categoryId: string; isRequired: boolean; quantity: number }
    ): Promise<Result<IPackageSlotEntity>>;

    /**
     * Removes a content slot from a package.
     *
     * @param packageId - The package UUID
     * @param slotId - The slot UUID to remove
     * @returns `ok({ isSuccess })` on success, `err(Failure)` on failure
     */
    removePackageSlot(packageId: string, slotId: string): Promise<Result<{ isSuccess: boolean }>>;
}
