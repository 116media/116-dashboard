import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRolesQueryParams } from "@/modules/roles/presentation/model/IRolesQueryParams";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetAllRolesAction = () =>
    rolesSlice.actions.clear({ context: ActionType.GetAllRoles });

/**
 * Async thunk to fetch a paginated list of roles.
 *
 * @description
 * Dispatches `getAllRolesUseCase` with pagination and filter params.
 * On success, stores the paginated result in `roles.getAll.data`.
 * On failure, stores the backend `Failure` in `roles.getAll.error`.
 */
export const getAllRolesAction = createAsyncThunk<
    IRolePaginatedResult,
    IRolesQueryParams,
    { rejectValue: Failure }
>(ActionType.GetAllRoles, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllRolesUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
