import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "@/modules/auth/domain/entities/IUser";
import { ActionType } from "@/platform/session/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";
import type { AppDispatch } from "@/shared/presentation/store/thunk.type";
import { sessionSlice } from ".";

/**
 * Async thunk to fetch the current authenticated user's profile.
 *
 * @description
 * Calls the getProfileUseCase to retrieve the user data from the API.
 * The result is stored in `session.currentUser` via ActionWrapperFulfilled.
 */
export const getCurrentUserAction = createAsyncThunk<
    IUser,
    void,
    { rejectValue: IApiProblemDetails }
>(ActionType.SessionCurrentUser, async (_, { rejectWithValue }) => {
    try {
        return await container.cradle.getProfileUseCase.execute();
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});

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
