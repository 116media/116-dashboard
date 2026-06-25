import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateCategoryAction = () =>
    catalogSlice.actions.clear({ context: ActionType.UpdateCategory });

/**
 * Async thunk to update an existing category.
 *
 * @description
 * Sends updated category data to the backend via `updateCategoryUseCase`.
 * On success, stores the updated category in `catalog.updateCategory.data`.
 */
export const updateCategoryAction = createAsyncThunk<
    ICategoryEntity,
    {
        id: string;
        data: {
            name: string;
            slug: string;
            description: string;
            isGossip: boolean;
            isExclusive: boolean;
        };
    },
    { rejectValue: Failure }
>(ActionType.UpdateCategory, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateCategoryUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
