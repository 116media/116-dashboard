import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to soft-delete a permission (reversible).
 *
 * @description
 * Marks the permission as deleted without removing it from
 * the database. Can be restored later.
 */
export const softDeletePermissionAction = createAsyncThunk<
    IPermissionEntity,
    string,
    { rejectValue: Failure }
>(ActionType.SoftDeletePermission, async (id, { rejectWithValue }) => {
    const result = await container.cradle.softDeletePermissionUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
