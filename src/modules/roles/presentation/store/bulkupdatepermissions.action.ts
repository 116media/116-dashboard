import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import { rolesSlice } from "@/modules/roles/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetBulkUpdatePermissionsAction = () =>
    rolesSlice.actions.clear({ context: ActionType.BulkUpdatePermissions });

/**
 * Async thunk to replace all permissions on a role.
 *
 * @description
 * Sends the full list of desired permission IDs via
 * `bulkUpdatePermissionsUseCase`. The backend adds new ones
 * and removes those not in the list.
 */
export const bulkUpdatePermissionsAction = createAsyncThunk<
    IRoleWithPermissions,
    { roleId: string; permissionIds: string[] },
    { rejectValue: Failure }
>(ActionType.BulkUpdatePermissions, async (params, { rejectWithValue }) => {
    const result = await container.cradle.bulkUpdatePermissionsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
