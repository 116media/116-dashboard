import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCreateCategoryAction = () =>
    catalogSlice.actions.clear({ context: ActionType.CreateCategory });

/**
 * Async thunk to create a new category.
 *
 * @description
 * Sends category data to the backend via `createCategoryUseCase`.
 * On success, stores the created category in `catalog.createCategory.data`.
 */
export const createCategoryAction = createAsyncThunk<
    ICategoryEntity,
    { contentTypeId: string; name: string; slug: string; description: string; isFree: boolean },
    { rejectValue: Failure }
>(ActionType.CreateCategory, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createCategoryUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
