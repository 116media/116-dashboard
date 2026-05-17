import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import { permissionsSlice } from "@/modules/permissions/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetActivatePermissionAction = () =>
    permissionsSlice.actions.clear({ context: ActionType.ActivatePermission });

/**
 * Async thunk to activate an inactive permission.
 *
 * @description
 * Sets the permission's isActive flag to true.
 * Returns 409 if already active.
 */
export const activatePermissionAction = createAsyncThunk<
    IPermissionEntity,
    string,
    { rejectValue: Failure }
>(ActionType.ActivatePermission, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activatePermissionUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
