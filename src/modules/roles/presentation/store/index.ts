import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { activateRoleAction } from "./activate.action";
import { assignPermissionAction } from "./assignpermission.action";
import { bulkUpdatePermissionsAction } from "./bulkupdatepermissions.action";
import { SliceName } from "./constants";
import { createRoleAction } from "./create.action";
import { deactivateRoleAction } from "./deactivate.action";
import { getAllRolesAction } from "./getall.action";
import { getRoleByIdAction } from "./getbyid.action";
import { hardDeleteRoleAction } from "./harddelete.action";
import { removePermissionAction } from "./removepermission.action";
import { restoreRoleAction } from "./restore.action";
import { softDeleteRoleAction } from "./softdelete.action";
import { rolesInitialState } from "./state";
import type { RolesStateKey } from "./type";
import { updateRoleAction } from "./update.action";

/**
 * Redux slice for the roles module.
 *
 * @description
 * Manages state for 12 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const rolesSlice = createSlice({
    name: SliceName.Roles,
    initialState: rolesInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<RolesStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get all roles
            .addCase(getAllRolesAction.pending, ActionWrapperPending)
            .addCase(getAllRolesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllRolesAction.rejected, ActionWrapperRejected)
            // get role by id
            .addCase(getRoleByIdAction.pending, ActionWrapperPending)
            .addCase(getRoleByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRoleByIdAction.rejected, ActionWrapperRejected)
            // create role
            .addCase(createRoleAction.pending, ActionWrapperPending)
            .addCase(createRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createRoleAction.rejected, ActionWrapperRejected)
            // update role
            .addCase(updateRoleAction.pending, ActionWrapperPending)
            .addCase(updateRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateRoleAction.rejected, ActionWrapperRejected)
            // activate role
            .addCase(activateRoleAction.pending, ActionWrapperPending)
            .addCase(activateRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activateRoleAction.rejected, ActionWrapperRejected)
            // deactivate role
            .addCase(deactivateRoleAction.pending, ActionWrapperPending)
            .addCase(deactivateRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivateRoleAction.rejected, ActionWrapperRejected)
            // soft delete role
            .addCase(softDeleteRoleAction.pending, ActionWrapperPending)
            .addCase(softDeleteRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(softDeleteRoleAction.rejected, ActionWrapperRejected)
            // hard delete role
            .addCase(hardDeleteRoleAction.pending, ActionWrapperPending)
            .addCase(hardDeleteRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(hardDeleteRoleAction.rejected, ActionWrapperRejected)
            // restore role
            .addCase(restoreRoleAction.pending, ActionWrapperPending)
            .addCase(restoreRoleAction.fulfilled, ActionWrapperFulfilled)
            .addCase(restoreRoleAction.rejected, ActionWrapperRejected)
            // assign permission to role
            .addCase(assignPermissionAction.pending, ActionWrapperPending)
            .addCase(assignPermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(assignPermissionAction.rejected, ActionWrapperRejected)
            // remove permission from role
            .addCase(removePermissionAction.pending, ActionWrapperPending)
            .addCase(removePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removePermissionAction.rejected, ActionWrapperRejected)
            // bulk update role permissions
            .addCase(bulkUpdatePermissionsAction.pending, ActionWrapperPending)
            .addCase(bulkUpdatePermissionsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(bulkUpdatePermissionsAction.rejected, ActionWrapperRejected);
    }
});

export default rolesSlice.reducer;
