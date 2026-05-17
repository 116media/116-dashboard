import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateCategoryPricingAction = () =>
    catalogSlice.actions.clear({ context: ActionType.UpdateCategoryPricing });

/**
 * Async thunk to update pricing for a category.
 *
 * @description
 * Sends updated pricing data to the backend via `updateCategoryPricingUseCase`.
 * On success, stores the updated pricing in `catalog.updateCategoryPricing.data`.
 */
export const updateCategoryPricingAction = createAsyncThunk<
    ICategoryPricingEntity,
    { categoryId: string; pricingId: string; data: { priceUsd: number } },
    { rejectValue: Failure }
>(ActionType.UpdateCategoryPricing, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateCategoryPricingUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
