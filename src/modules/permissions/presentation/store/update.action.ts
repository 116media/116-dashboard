import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IUpdatePermissionCredentials } from "@/modules/permissions/presentation/model/IUpdatePermissionCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update an existing permission.
 *
 * @description
 * Sends partial fields to the backend. Returns 409 if the new
 * resource+action combination conflicts with an existing permission.
 */
export const updatePermissionAction = createAsyncThunk<
    IPermissionEntity,
    { id: string; data: IUpdatePermissionCredentials },
    { rejectValue: Failure }
>(ActionType.UpdatePermission, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updatePermissionUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
