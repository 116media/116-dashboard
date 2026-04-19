import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { activatePermissionAction } from "./activate.action";
import { SliceName } from "./constants";
import { createPermissionAction } from "./create.action";
import { deactivatePermissionAction } from "./deactivate.action";
import { getAllPermissionsAction } from "./getall.action";
import { getPermissionByIdAction } from "./getbyid.action";
import { hardDeletePermissionAction } from "./harddelete.action";
import { restorePermissionAction } from "./restore.action";
import { softDeletePermissionAction } from "./softdelete.action";
import { permissionsInitialState } from "./state";
import type { PermissionsStateKey } from "./type";
import { updatePermissionAction } from "./update.action";

/**
 * Redux slice for the permissions module.
 *
 * @description
 * Manages state for 9 async operations using the shared
 * ActionWrapper* reducer helpers. Includes `clear` (single reset)
 * and `purge` (selective reset) reducers.
 */
export const permissionsSlice = createSlice({
    name: SliceName.Permissions,
    initialState: permissionsInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<PermissionsStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get all permissions
            .addCase(getAllPermissionsAction.pending, ActionWrapperPending)
            .addCase(getAllPermissionsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllPermissionsAction.rejected, ActionWrapperRejected)
            // get permission by id
            .addCase(getPermissionByIdAction.pending, ActionWrapperPending)
            .addCase(getPermissionByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPermissionByIdAction.rejected, ActionWrapperRejected)
            // create permission
            .addCase(createPermissionAction.pending, ActionWrapperPending)
            .addCase(createPermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createPermissionAction.rejected, ActionWrapperRejected)
            // update permission
            .addCase(updatePermissionAction.pending, ActionWrapperPending)
            .addCase(updatePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updatePermissionAction.rejected, ActionWrapperRejected)
            // activate permission
            .addCase(activatePermissionAction.pending, ActionWrapperPending)
            .addCase(activatePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(activatePermissionAction.rejected, ActionWrapperRejected)
            // deactivate permission
            .addCase(deactivatePermissionAction.pending, ActionWrapperPending)
            .addCase(deactivatePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deactivatePermissionAction.rejected, ActionWrapperRejected)
            // soft delete permission
            .addCase(softDeletePermissionAction.pending, ActionWrapperPending)
            .addCase(softDeletePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(softDeletePermissionAction.rejected, ActionWrapperRejected)
            // hard delete permission
            .addCase(hardDeletePermissionAction.pending, ActionWrapperPending)
            .addCase(hardDeletePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(hardDeletePermissionAction.rejected, ActionWrapperRejected)
            // restore permission
            .addCase(restorePermissionAction.pending, ActionWrapperPending)
            .addCase(restorePermissionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(restorePermissionAction.rejected, ActionWrapperRejected);
    }
});

export default permissionsSlice.reducer;
