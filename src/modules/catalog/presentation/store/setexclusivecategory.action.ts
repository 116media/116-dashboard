import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetSetExclusiveCategoryAction = () =>
    catalogSlice.actions.clear({ context: ActionType.SetExclusiveCategory });

/**
 * Async thunk to mark a category as the exclusive show.
 *
 * @description
 * Calls `setExclusiveCategoryUseCase`. The backend enforces the mutex and auto-unsets the
 * previously exclusive category, so callers should refresh the list after success.
 */
export const setExclusiveCategoryAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.SetExclusiveCategory, async (id, { rejectWithValue }) => {
    const result = await container.cradle.setExclusiveCategoryUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
