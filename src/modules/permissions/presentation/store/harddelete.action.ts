import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionActionResponse } from "@/modules/permissions/domain/entities/IPermissionActionResponse";
import { permissionsSlice } from "@/modules/permissions/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetHardDeletePermissionAction = () =>
    permissionsSlice.actions.clear({ context: ActionType.HardDeletePermission });

/**
 * Async thunk to permanently delete a permission (irreversible).
 *
 * @description
 * Removes the permission from the database permanently.
 */
export const hardDeletePermissionAction = createAsyncThunk<
    IPermissionActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.HardDeletePermission, async (id, { rejectWithValue }) => {
    const result = await container.cradle.hardDeletePermissionUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
