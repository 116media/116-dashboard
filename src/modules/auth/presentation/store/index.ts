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
import { forgotPasswordAction } from "./forgotpassword.action";
import { loginAction } from "./login.action";
import { resendOtpAction } from "./resendotp.action";
import { resetPasswordAction } from "./resetpassword.action";
import { signOutAction } from "./signout.action";
import { signOutAllAction } from "./signoutall.action";
import { authInitialState } from "./state";
import type { IAuthState } from "./type";
import { verifyOtpAction } from "./verifyotp.action";

type AuthStateKey = keyof IAuthState;

/**
 * Auth Redux slice.
 *
 * @description
 * Manages authentication state including login, logout, and profile updates,etc.
 *
 * Uses action wrappers for consistent async state handling.
 *
 * @remarks
 * - Exports authSlice for accessing actions
 * - Default export is the reducer for store configuration
 */
export const authSlice = createSlice({
    name: SliceName.Auth,
    initialState: authInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<AuthStateKey[]>) => {
            action.payload.forEach((key) => {
                if (state[key]) state[key] = createInitialState();
            });
        }
    },
    extraReducers: (builder) => {
        builder
            // login usecase
            .addCase(loginAction.pending, ActionWrapperPending)
            .addCase(loginAction.fulfilled, ActionWrapperFulfilled)
            .addCase(loginAction.rejected, ActionWrapperRejected)
            // forgot password usecase
            .addCase(forgotPasswordAction.pending, ActionWrapperPending)
            .addCase(forgotPasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(forgotPasswordAction.rejected, ActionWrapperRejected)
            // verify OTP usecase
            .addCase(verifyOtpAction.pending, ActionWrapperPending)
            .addCase(verifyOtpAction.fulfilled, ActionWrapperFulfilled)
            .addCase(verifyOtpAction.rejected, ActionWrapperRejected)
            // resend OTP usecase
            .addCase(resendOtpAction.pending, ActionWrapperPending)
            .addCase(resendOtpAction.fulfilled, ActionWrapperFulfilled)
            .addCase(resendOtpAction.rejected, ActionWrapperRejected)
            // reset password usecase
            .addCase(resetPasswordAction.pending, ActionWrapperPending)
            .addCase(resetPasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(resetPasswordAction.rejected, ActionWrapperRejected)
            // sign out
            .addCase(signOutAction.pending, ActionWrapperPending)
            .addCase(signOutAction.fulfilled, ActionWrapperFulfilled)
            .addCase(signOutAction.rejected, ActionWrapperRejected)
            // sign out all
            .addCase(signOutAllAction.pending, ActionWrapperPending)
            .addCase(signOutAllAction.fulfilled, ActionWrapperFulfilled)
            .addCase(signOutAllAction.rejected, ActionWrapperRejected);
    }
});

/**
 * Auth reducer for Redux store.
 */
const authReducer = authSlice.reducer;
export default authReducer;
