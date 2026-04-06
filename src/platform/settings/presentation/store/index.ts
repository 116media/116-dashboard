import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { SliceName } from "./constants";
import { getProfileAction, updateAccountAction, updateAvatarAction } from "./profile.action";
import { changePasswordAction, getRolesAction } from "./security.action";
import { settingsInitialState } from "./state";
import type { SettingsStateKey } from "./type";

export const settingsSlice = createSlice({
    name: SliceName.Settings,
    initialState: settingsInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<SettingsStateKey[]>) => {
            action.payload.forEach((key) => {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            // get profile
            .addCase(getProfileAction.pending, ActionWrapperPending)
            .addCase(getProfileAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getProfileAction.rejected, ActionWrapperRejected)
            // update account
            .addCase(updateAccountAction.pending, ActionWrapperPending)
            .addCase(updateAccountAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAccountAction.rejected, ActionWrapperRejected)
            // update avatar
            .addCase(updateAvatarAction.pending, ActionWrapperPending)
            .addCase(updateAvatarAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAvatarAction.rejected, ActionWrapperRejected)
            // change password
            .addCase(changePasswordAction.pending, ActionWrapperPending)
            .addCase(changePasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(changePasswordAction.rejected, ActionWrapperRejected)
            // get roles
            .addCase(getRolesAction.pending, ActionWrapperPending)
            .addCase(getRolesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRolesAction.rejected, ActionWrapperRejected);
    }
});

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
