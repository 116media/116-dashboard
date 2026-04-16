import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICatalogActionResponse } from "@/modules/catalog/domain/entities/ICatalogActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to remove pricing from a category.
 *
 * @description
 * Removes the specified pricing entry via `removeCategoryPricingUseCase`.
 * On success, stores `{ isSuccess: true }` in `catalog.removeCategoryPricing.data`.
 */
export const removeCategoryPricingAction = createAsyncThunk<
    ICatalogActionResponse,
    { categoryId: string; pricingId: string },
    { rejectValue: Failure }
>(ActionType.RemoveCategoryPricing, async (params, { rejectWithValue }) => {
    const result = await container.cradle.removeCategoryPricingUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
