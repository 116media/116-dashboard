import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ICatalogState } from "./type";

/**
 * Initial state for the catalog Redux slice.
 *
 * @description
 * Defines initial state for all catalog-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const catalogInitialState: ICatalogState = {
    getAllCategories: createInitialState(),
    getCategoryById: createInitialState(),
    createCategory: createInitialState(),
    updateCategory: createInitialState(),
    activateCategory: createInitialState(),
    deactivateCategory: createInitialState(),
    setExclusiveCategory: createInitialState(),
    uploadCategoryPoster: createInitialState(),
    addCategoryPricing: createInitialState(),
    updateCategoryPricing: createInitialState(),
    removeCategoryPricing: createInitialState(),
    getAllCustomers: createInitialState(),
    getCustomerById: createInitialState(),
    createCustomer: createInitialState(),
    updateCustomer: createInitialState(),
    getAllPackages: createInitialState(),
    getPackageById: createInitialState(),
    createPackage: createInitialState(),
    activatePackage: createInitialState(),
    deactivatePackage: createInitialState(),
    addPackageSlot: createInitialState(),
    removePackageSlot: createInitialState()
};
