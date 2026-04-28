import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

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
