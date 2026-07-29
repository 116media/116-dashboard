import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICatalogActionResponse } from "@/modules/catalog/domain/entities/ICatalogActionResponse";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import { CatalogMapper } from "@/modules/catalog/infrastructure/mappers/catalog.mapper";
import type { IAddCategoryPricingCredentials } from "@/modules/catalog/presentation/model/IAddCategoryPricingCredentials";
import type { IAddPackageSlotCredentials } from "@/modules/catalog/presentation/model/IAddPackageSlotCredentials";
import type { ICategoriesQueryParams } from "@/modules/catalog/presentation/model/ICategoriesQueryParams";
import type { ICreateCategoryData } from "@/modules/catalog/presentation/model/ICreateCategoryData";
import type { ICreateCustomerCredentials } from "@/modules/catalog/presentation/model/ICreateCustomerCredentials";
import type { ICreatePackageCredentials } from "@/modules/catalog/presentation/model/ICreatePackageCredentials";
import type { ICustomersQueryParams } from "@/modules/catalog/presentation/model/ICustomersQueryParams";
import type { IPackagesQueryParams } from "@/modules/catalog/presentation/model/IPackagesQueryParams";
import type { IUpdateCategoryCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryCredentials";
import type { IUpdateCategoryPricingCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryPricingCredentials";
import type { IUpdateCustomerCredentials } from "@/modules/catalog/presentation/model/IUpdateCustomerCredentials";
import type { IUploadCategoryPosterCredentials } from "@/modules/catalog/presentation/model/IUploadCategoryPosterCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Catalog repository implementation using REST API.
 */
export class CatalogRepositoryImpl implements ICatalogRepositoryPort {
    async getAllCategories(
        params: ICategoriesQueryParams
    ): Promise<Result<IPaginatedResult<ICategoryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllCategories({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                isActive: params.isActive,
                isFree: params.isFree
            });
            const paginated = response.data.categories;
            return ok({
                items: CatalogMapper.categoryListFromDto(paginated.items),
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
        data: ICreateCategoryData
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
        data: IUpdateCategoryCredentials
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

    async setExclusiveCategory(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminSetExclusiveCategory(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async pinCategoryToFeed(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminPinCategoryToFeed(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async unpinCategoryFromFeed(id: string): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminUnpinCategoryFromFeed(id);
            return ok(CatalogMapper.categoryFromDto(response.data.category));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async uploadCategoryPoster(
        id: string,
        data: IUploadCategoryPosterCredentials
    ): Promise<Result<ICategoryEntity>> {
        try {
            const response = await apiClient.api.adminUploadCategoryPoster(id, { file: data.file });
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
        data: IAddCategoryPricingCredentials
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
        data: IUpdateCategoryPricingCredentials
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
    ): Promise<Result<ICatalogActionResponse>> {
        try {
            const response = await apiClient.api.adminRemoveCategoryPricing(categoryId, pricingId);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllCustomers(
        params: ICustomersQueryParams
    ): Promise<Result<IPaginatedResult<ICustomerEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllCustomers({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize
            });
            const paginated = response.data.customers;
            return ok({
                items: CatalogMapper.customerListFromDto(paginated.items),
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

    async createCustomer(data: ICreateCustomerCredentials): Promise<Result<ICustomerEntity>> {
        try {
            const response = await apiClient.api.adminCreateCustomer(data);
            return ok(CatalogMapper.customerFromDto(response.data.customer));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateCustomer(
        id: string,
        data: IUpdateCustomerCredentials
    ): Promise<Result<ICustomerEntity>> {
        try {
            const response = await apiClient.api.adminUpdateCustomer(id, data);
            return ok(CatalogMapper.customerFromDto(response.data.customer));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllPackages(
        params: IPackagesQueryParams
    ): Promise<Result<IPaginatedResult<IPackageEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllPackages({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                isActive: params.isActive
            });
            const paginated = response.data.packages;
            return ok({
                items: CatalogMapper.packageListFromDto(paginated.items),
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

    async createPackage(data: ICreatePackageCredentials): Promise<Result<IPackageEntity>> {
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
        data: IAddPackageSlotCredentials
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
    ): Promise<Result<ICatalogActionResponse>> {
        try {
            const response = await apiClient.api.adminRemovePackageSlot(packageId, slotId);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
