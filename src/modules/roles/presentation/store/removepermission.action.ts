import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to remove a single permission from a role.
 *
 * @description
 * Removes a permission from the role's set via `removePermissionUseCase`.
 * Returns 400 if not assigned, 404 if role or permission not found.
 */
export const removePermissionAction = createAsyncThunk<
    IRoleWithPermissions,
    { roleId: string; permissionId: string },
    { rejectValue: Failure }
>(ActionType.RemovePermission, async (params, { rejectWithValue }) => {
    const result = await container.cradle.removePermissionUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
