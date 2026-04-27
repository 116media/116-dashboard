import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetAllCategoriesAction = () =>
    catalogSlice.actions.clear({ context: ActionType.GetAllCategories });

/**
 * Async thunk to fetch a paginated list of categories.
 *
 * @description
 * Dispatches `getAllCategoriesUseCase` with pagination and filter params.
 * On success, stores the paginated result in `catalog.getAllCategories.data`.
 * On failure, stores the backend `Failure` in `catalog.getAllCategories.error`.
 */
export const getAllCategoriesAction = createAsyncThunk<
    IPaginatedResult<ICategoryEntity>,
    { pageIndex: number; pageSize: number; isActive?: boolean; isFree?: boolean; search?: string },
    { rejectValue: Failure }
>(ActionType.GetAllCategories, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllCategoriesUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
