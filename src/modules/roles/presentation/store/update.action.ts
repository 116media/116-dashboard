import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IUpdateRoleCredentials } from "@/modules/roles/presentation/model/IUpdateRoleCredentials";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateRoleAction = () =>
    rolesSlice.actions.clear({ context: ActionType.UpdateRole });

/**
 * Async thunk to update an existing role's name and/or description.
 *
 * @description
 * Sends partial fields to the backend via `updateRoleUseCase`.
 * Returns 409 if the new name conflicts with an existing role.
 */
export const updateRoleAction = createAsyncThunk<
    IRoleEntity,
    { id: string; data: IUpdateRoleCredentials },
    { rejectValue: Failure }
>(ActionType.UpdateRole, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateRoleUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
