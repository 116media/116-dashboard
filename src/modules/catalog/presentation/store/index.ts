import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { activateCategoryAction } from "./activatecategory.action";
import { activatePackageAction } from "./activatepackage.action";
import { addCategoryPricingAction } from "./addcategorypricing.action";
import { addPackageSlotAction } from "./addpackageslot.action";
import { SliceName } from "./constants";
import { createCategoryAction } from "./createcategory.action";
import { createCustomerAction } from "./createcustomer.action";
import { createPackageAction } from "./createpackage.action";
import { deactivateCategoryAction } from "./deactivatecategory.action";
import { deactivatePackageAction } from "./deactivatepackage.action";
import { getAllCategoriesAction } from "./getallcategories.action";
import { getAllCustomersAction } from "./getallcustomers.action";
import { getAllPackagesAction } from "./getallpackages.action";
import { getCategoryByIdAction } from "./getcategorybyid.action";
import { getCustomerByIdAction } from "./getcustomerbyid.action";
import { getPackageByIdAction } from "./getpackagebyid.action";
import { removeCategoryPricingAction } from "./removecategorypricing.action";
import { removePackageSlotAction } from "./removepackageslot.action";
import { catalogInitialState } from "./state";
import type { CatalogStateKey } from "./type";
import { updateCategoryAction } from "./updatecategory.action";
import { updateCategoryPricingAction } from "./updatecategorypricing.action";
import { updateCustomerAction } from "./updatecustomer.action";

/**
 * Redux slice for the catalog module.
 *
 * @description
 * Manages state for 20 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const catalogSlice = createSlice({
    name: SliceName.Catalog,
    initialState: catalogInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<CatalogStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get all categories
            .addCase(getAllCategoriesAction.pending, ActionWrapperPending)
            .addCase(getAllCategoriesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllCategoriesAction.rejected, ActionWrapperRejected)
            // get category by id
            .addCase(getCategoryByIdAction.pending, ActionWrapperPending)
            .addCase(getCategoryByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCategoryByIdAction.rejected, ActionWrapperRejected)
            // create category
            .addCase(createCategoryAction.pending, ActionWrapperPending)
            .addCase(createCategoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createCategoryAction.rejected, ActionWrapperRejected)
            // update category
            .addCase(updateCategoryAction.pending, ActionWrapperPending)
            .addCase(updateCategoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateCategoryAction.rejected, ActionWrapperRejected)
            // activate category
            .addCase(activateCategoryAction.pending, ActionWrapperPending)
            .addCase(activateCategoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activateCategoryAction.rejected, ActionWrapperRejected)
            // deactivate category
            .addCase(deactivateCategoryAction.pending, ActionWrapperPending)
            .addCase(deactivateCategoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivateCategoryAction.rejected, ActionWrapperRejected)
            // add category pricing
            .addCase(addCategoryPricingAction.pending, ActionWrapperPending)
            .addCase(addCategoryPricingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addCategoryPricingAction.rejected, ActionWrapperRejected)
            // update category pricing
            .addCase(updateCategoryPricingAction.pending, ActionWrapperPending)
            .addCase(updateCategoryPricingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateCategoryPricingAction.rejected, ActionWrapperRejected)
            // remove category pricing
            .addCase(removeCategoryPricingAction.pending, ActionWrapperPending)
            .addCase(removeCategoryPricingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeCategoryPricingAction.rejected, ActionWrapperRejected)
            // get all customers
            .addCase(getAllCustomersAction.pending, ActionWrapperPending)
            .addCase(getAllCustomersAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllCustomersAction.rejected, ActionWrapperRejected)
            // get customer by id
            .addCase(getCustomerByIdAction.pending, ActionWrapperPending)
            .addCase(getCustomerByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCustomerByIdAction.rejected, ActionWrapperRejected)
            // create customer
            .addCase(createCustomerAction.pending, ActionWrapperPending)
            .addCase(createCustomerAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createCustomerAction.rejected, ActionWrapperRejected)
            // update customer
            .addCase(updateCustomerAction.pending, ActionWrapperPending)
            .addCase(updateCustomerAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateCustomerAction.rejected, ActionWrapperRejected)
            // get all packages
            .addCase(getAllPackagesAction.pending, ActionWrapperPending)
            .addCase(getAllPackagesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllPackagesAction.rejected, ActionWrapperRejected)
            // get package by id
            .addCase(getPackageByIdAction.pending, ActionWrapperPending)
            .addCase(getPackageByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPackageByIdAction.rejected, ActionWrapperRejected)
            // create package
            .addCase(createPackageAction.pending, ActionWrapperPending)
            .addCase(createPackageAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createPackageAction.rejected, ActionWrapperRejected)
            // activate package
            .addCase(activatePackageAction.pending, ActionWrapperPending)
            .addCase(activatePackageAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activatePackageAction.rejected, ActionWrapperRejected)
            // deactivate package
            .addCase(deactivatePackageAction.pending, ActionWrapperPending)
            .addCase(deactivatePackageAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivatePackageAction.rejected, ActionWrapperRejected)
            // add package slot
            .addCase(addPackageSlotAction.pending, ActionWrapperPending)
            .addCase(addPackageSlotAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addPackageSlotAction.rejected, ActionWrapperRejected)
            // remove package slot
            .addCase(removePackageSlotAction.pending, ActionWrapperPending)
            .addCase(removePackageSlotAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removePackageSlotAction.rejected, ActionWrapperRejected);
    }
});

export default catalogSlice.reducer;
