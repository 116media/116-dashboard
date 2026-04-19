import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type { IPermissionsQueryParams } from "@/modules/permissions/presentation/model/IPermissionsQueryParams";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a paginated list of permissions.
 *
 * @description
 * Dispatches `getAllPermissionsUseCase` with pagination and filter params.
 * On success, stores the paginated result in `permissions.getAll.data`.
 * On failure, stores the backend `Failure` in `permissions.getAll.error`.
 */
export const getAllPermissionsAction = createAsyncThunk<
    IPermissionPaginatedResult,
    IPermissionsQueryParams,
    { rejectValue: Failure }
>(ActionType.GetAllPermissions, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllPermissionsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
