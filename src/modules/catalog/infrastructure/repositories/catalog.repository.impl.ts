import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import { CatalogMapper } from "@/modules/catalog/infrastructure/mappers/catalog.mapper";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Catalog repository implementation using REST API.
 */
export class CatalogRepositoryImpl implements ICatalogRepositoryPort {
    async getAllCategories(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        isFree?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICategoryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllCategories({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                isActive: params.isActive,
                isFree: params.isFree
            });
            const paginated = response.data.categories;
            return ok({
                items: paginated.items.map(CatalogMapper.categoryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getCategoryById(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminGetCategoryById(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createCategory(
        contentTypeId: string,
        data: { name: string; slug: string; description: string; isFree: boolean }
    ): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminCreateCategory(contentTypeId, data);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateCategory(
        id: string,
        data: { name: string; slug: string; description: string }
    ): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminUpdateCategory(id, data);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activateCategory(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminActivateCategory(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivateCategory(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminDeactivateCategory(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async addCategoryPricing(
        categoryId: string,
        data: { pricingTierId: string; priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>> {
        try {
            const response = await apiClient.api.adminAddCategoryPricing(categoryId, data);
            return ok(CatalogMapper.categoryPricingFromDto(response.data.pricing));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateCategoryPricing(
        categoryId: string,
        pricingId: string,
        data: { priceUsd: number }
    ): Promise<Result<ICategoryPricingEntity>> {
        try {
            const response = await apiClient.api.adminUpdateCategoryPricing(
                categoryId,
                pricingId,
                data
            );
            return ok(CatalogMapper.categoryPricingFromDto(response.data.pricing));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async removeCategoryPricing(
        categoryId: string,
        pricingId: string
    ): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminRemoveCategoryPricing(categoryId, pricingId);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllCustomers(params: {
        pageIndex: number;
        pageSize: number;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICustomerEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllCustomers({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize
            });
            const paginated = response.data.customers;
            return ok({
                items: paginated.items.map(CatalogMapper.customerFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getCustomerById(id: string): Promise<Result<ICustomerEntity>> {
        try {
            const response = await apiClient.api.adminGetCustomerById(id);
            return ok(CatalogMapper.customerFromDto(response.data.customer));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createCustomer(data: {
        fullName: string;
        email: string;
        phone?: string;
        company?: string;
        notes?: string;
    }): Promise<Result<ICustomerEntity>> {
        try {
            const response = await apiClient.api.adminCreateCustomer(data);
            return ok(CatalogMapper.customerFromDto(response.data.customer));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateCustomer(
        id: string,
        data: { fullName: string; phone?: string; company?: string; notes?: string }
    ): Promise<Result<ICustomerEntity>> {
        try {
            const response = await apiClient.api.adminUpdateCustomer(id, data);
            return ok(CatalogMapper.customerFromDto(response.data.customer));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllPackages(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPackageEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllPackages({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                isActive: params.isActive
            });
            const paginated = response.data.packages;
            return ok({
                items: paginated.items.map(CatalogMapper.packageFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getPackageById(id: string): Promise<Result<IPackageEntity>> {
        try {
            const response = await apiClient.api.adminGetPackageById(id);
            return ok(CatalogMapper.packageFromDto(response.data.package));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createPackage(data: {
        name: string;
        description: string;
        flatPriceUsd: number;
    }): Promise<Result<IPackageEntity>> {
        try {
            const response = await apiClient.api.adminCreatePackage(data);
            return ok(CatalogMapper.packageFromDto(response.data.package));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activatePackage(id: string): Promise<Result<IPackageEntity>> {
        try {
            const response = await apiClient.api.adminActivatePackage(id);
            return ok(CatalogMapper.packageFromDto(response.data.package));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivatePackage(id: string): Promise<Result<IPackageEntity>> {
        try {
            const response = await apiClient.api.adminDeactivatePackage(id);
            return ok(CatalogMapper.packageFromDto(response.data.package));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async addPackageSlot(
        packageId: string,
        data: { categoryId: string; isRequired: boolean; quantity: number }
    ): Promise<Result<IPackageSlotEntity>> {
        try {
            const response = await apiClient.api.adminAddPackageSlot(packageId, data);
            const slots = response.data.package.slots;
            const added = slots[slots.length - 1];
            return ok(CatalogMapper.packageSlotFromDto(added));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async removePackageSlot(
        packageId: string,
        slotId: string
    ): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminRemovePackageSlot(packageId, slotId);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
