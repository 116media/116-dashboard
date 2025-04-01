import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to assign a single permission to a role.
 *
 * @description
 * Adds a permission to the role's set via `assignPermissionUseCase`.
 * Returns 409 if already assigned, 404 if role or permission not found.
 */
export const assignPermissionAction = createAsyncThunk<
    IRoleWithPermissions,
    { roleId: string; permissionId: string },
    { rejectValue: Failure }
>(ActionType.AssignPermission, async (params, { rejectWithValue }) => {
    const result = await container.cradle.assignPermissionUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
