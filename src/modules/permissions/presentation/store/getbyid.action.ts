import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import { permissionsSlice } from "@/modules/permissions/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetPermissionByIdAction = () =>
    permissionsSlice.actions.clear({ context: ActionType.GetPermissionById });

/**
 * Async thunk to fetch a single permission by ID.
 *
 * @description
 * Stores the permission in `permissions.getById.data`.
 */
export const getPermissionByIdAction = createAsyncThunk<
    IPermissionEntity,
    string,
    { rejectValue: Failure }
>(ActionType.GetPermissionById, async (id, { rejectWithValue }) => {
    const result = await container.cradle.getPermissionByIdUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
