import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetAddCategoryPricingAction = () =>
    catalogSlice.actions.clear({ context: ActionType.AddCategoryPricing });

/**
 * Async thunk to add pricing to a category.
 *
 * @description
 * Sends pricing data to the backend via `addCategoryPricingUseCase`.
 * On success, stores the created pricing in `catalog.addCategoryPricing.data`.
 */
export const addCategoryPricingAction = createAsyncThunk<
    ICategoryPricingEntity,
    { categoryId: string; data: { pricingTierId: string; priceUsd: number } },
    { rejectValue: Failure }
>(ActionType.AddCategoryPricing, async (params, { rejectWithValue }) => {
    const result = await container.cradle.addCategoryPricingUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
