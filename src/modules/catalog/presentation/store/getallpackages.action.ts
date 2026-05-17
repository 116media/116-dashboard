import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetAllPackagesAction = () =>
    catalogSlice.actions.clear({ context: ActionType.GetAllPackages });

/**
 * Async thunk to fetch a paginated list of packages.
 *
 * @description
 * Dispatches `getAllPackagesUseCase` with pagination and filter params.
 * On success, stores the paginated result in `catalog.getAllPackages.data`.
 * On failure, stores the backend `Failure` in `catalog.getAllPackages.error`.
 */
export const getAllPackagesAction = createAsyncThunk<
    IPaginatedResult<IPackageEntity>,
    { pageIndex: number; pageSize: number; isActive?: boolean; search?: string },
    { rejectValue: Failure }
>(ActionType.GetAllPackages, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllPackagesUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
