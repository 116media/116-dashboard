import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetCategoryByIdAction = () =>
    catalogSlice.actions.clear({ context: ActionType.GetCategoryById });

/**
 * Async thunk to fetch a single category by ID.
 *
 * @description
 * Dispatches `getCategoryByIdUseCase` with the category ID.
 * On success, stores the result in `catalog.getCategoryById.data`.
 */
export const getCategoryByIdAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetCategoryById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getCategoryByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
