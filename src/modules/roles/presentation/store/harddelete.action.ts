import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleActionResponse } from "@/modules/roles/domain/entities/IRoleActionResponse";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetHardDeleteRoleAction = () =>
    rolesSlice.actions.clear({ context: ActionType.HardDeleteRole });

/**
 * Async thunk to permanently delete a role (irreversible).
 *
 * @description
 * Removes the role and cascades to UserRole and RolePermission
 * junction tables. Returns 400 if core role, 404 if not found.
 */
export const hardDeleteRoleAction = createAsyncThunk<
    IRoleActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.HardDeleteRole, async (id, { rejectWithValue }) => {
    const result = await container.cradle.hardDeleteRoleUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
