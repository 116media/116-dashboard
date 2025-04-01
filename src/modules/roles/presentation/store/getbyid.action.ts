import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a single role by ID with its permissions.
 *
 * @description
 * Dispatches `getRoleByIdUseCase` with the role UUID.
 * On success, stores the role with permissions in `roles.getById.data`.
 * On failure, stores the backend `Failure` in `roles.getById.error`.
 */
export const getRoleByIdAction = createAsyncThunk<
    IRoleWithPermissions,
    string,
    { rejectValue: Failure }
>(ActionType.GetRoleById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getRoleByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
