import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import { permissionsSlice } from "@/modules/permissions/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCreatePermissionAction = () =>
    permissionsSlice.actions.clear({ context: ActionType.CreatePermission });

/**
 * Async thunk to create a new permission.
 *
 * @description
 * Sends resource, action, and description to the backend.
 * Returns 201 on success, 409 if the resource+action already exists.
 */
export const createPermissionAction = createAsyncThunk<
    IPermissionEntity,
    ICreatePermissionCredentials,
    { rejectValue: Failure }
>(ActionType.CreatePermission, async (data, { rejectWithValue }) => {
    const result = await container.cradle.createPermissionUseCase.execute(data);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
