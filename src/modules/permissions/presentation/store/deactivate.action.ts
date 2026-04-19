import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to deactivate an active permission.
 *
 * @description
 * Sets the permission's isActive flag to false.
 * Returns 409 if already inactive.
 */
export const deactivatePermissionAction = createAsyncThunk<
    IPermissionEntity,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivatePermission, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivatePermissionUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
