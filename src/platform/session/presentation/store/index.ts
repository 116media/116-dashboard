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
import { getCurrentUserAction } from "./currentuser.action";
import { getSessionsAction, revokeSessionAction } from "./session.action";
import { sessionInitialState } from "./state";
import type { SessionStateKey } from "./type";

/**
 * Redux slice for the session module.
 *
 * @description
 * Manages state for the current user profile, active sessions,
 * and session revocation. Uses the shared ActionWrapper* reducer
 * helpers for consistent async state handling.
 */
export const sessionSlice = createSlice({
    name: SliceName.Session,
    initialState: sessionInitialState,
    reducers: {
        clear: ActionWrapperReset,
        currentUser: ActionWrapperFulfilled,
        purge: (state, action: PayloadAction<SessionStateKey[]>) => {
            action.payload.forEach((key) => {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            // get current user
            .addCase(getCurrentUserAction.pending, ActionWrapperPending)
            .addCase(getCurrentUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCurrentUserAction.rejected, ActionWrapperRejected)
            // get sessions
            .addCase(getSessionsAction.pending, ActionWrapperPending)
            .addCase(getSessionsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSessionsAction.rejected, ActionWrapperRejected)
            // revoke session
            .addCase(revokeSessionAction.pending, ActionWrapperPending)
            .addCase(revokeSessionAction.fulfilled, ActionWrapperFulfilled)
            .addCase(revokeSessionAction.rejected, ActionWrapperRejected);
    }
});

const sessionReducer = sessionSlice.reducer;
export default sessionReducer;
