import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to restore a soft-deleted permission.
 *
 * @description
 * Sets isDeleted=false and deletedAt=null.
 * Returns 409 if the permission is not deleted.
 */
export const restorePermissionAction = createAsyncThunk<
    IPermissionEntity,
    string,
    { rejectValue: Failure }
>(ActionType.RestorePermission, async (id, { rejectWithValue }) => {
    const result = await container.cradle.restorePermissionUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
