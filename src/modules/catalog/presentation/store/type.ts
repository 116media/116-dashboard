import type { ICatalogActionResponse } from "@/modules/catalog/domain/entities/ICatalogActionResponse";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the catalog module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ICatalogState = {
    getAllCategories: IBasicInitialState<IPaginatedResult<ICategoryEntity>>;
    getCategoryById: IBasicInitialState<ICategoryEntity>;
    createCategory: IBasicInitialState<ICategoryEntity>;
    updateCategory: IBasicInitialState<ICategoryEntity>;
    activateCategory: IBasicInitialState<ICategoryEntity>;
    deactivateCategory: IBasicInitialState<ICategoryEntity>;
    setExclusiveCategory: IBasicInitialState<ICategoryEntity>;
    pinCategoryToFeed: IBasicInitialState<ICategoryEntity>;
    unpinCategoryFromFeed: IBasicInitialState<ICategoryEntity>;
    uploadCategoryPoster: IBasicInitialState<ICategoryEntity>;
    addCategoryPricing: IBasicInitialState<ICategoryPricingEntity>;
    updateCategoryPricing: IBasicInitialState<ICategoryPricingEntity>;
    removeCategoryPricing: IBasicInitialState<ICatalogActionResponse>;
    getAllCustomers: IBasicInitialState<IPaginatedResult<ICustomerEntity>>;
    getCustomerById: IBasicInitialState<ICustomerEntity>;
    createCustomer: IBasicInitialState<ICustomerEntity>;
    updateCustomer: IBasicInitialState<ICustomerEntity>;
    getAllPackages: IBasicInitialState<IPaginatedResult<IPackageEntity>>;
    getPackageById: IBasicInitialState<IPackageEntity>;
    createPackage: IBasicInitialState<IPackageEntity>;
    activatePackage: IBasicInitialState<IPackageEntity>;
    deactivatePackage: IBasicInitialState<IPackageEntity>;
    addPackageSlot: IBasicInitialState<IPackageSlotEntity>;
    removePackageSlot: IBasicInitialState<ICatalogActionResponse>;
};

export type CatalogStateKey = keyof ICatalogState;
