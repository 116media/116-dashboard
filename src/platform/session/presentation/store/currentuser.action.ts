import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { ActionType } from "@/platform/session/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";
import type { AppDispatch } from "@/shared/presentation/store/thunk.type";
import { sessionSlice } from ".";

export const getCurrentUserAction = createAsyncThunk<IUser, void, { rejectValue: Failure }>(
    ActionType.SessionCurrentUser,
    async (_, { rejectWithValue }) => {
        const result = await container.cradle.getProfileUseCase.execute();
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);

/**
 * Dispatches the currentUser reducer to update the user data in the store.
 *
 * @description
 * Use this after any successful operation that returns updated user data
 * (login, update account, update avatar, etc.) to keep the single source
 * of truth in sync.
 *
 * @param {IUser} payload - The updated user data
 * @returns Thunk action that dispatches sessionSlice.actions.currentUser
 */
export const setCurrentUserAction =
    (payload: IUser) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(sessionSlice.actions.currentUser({ ...payload }));
    };
