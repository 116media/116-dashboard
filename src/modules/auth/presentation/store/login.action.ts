import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetLoginAction = () => authSlice.actions.clear({ context: ActionType.AuthLogin });

/**
 * Async thunk to authenticate a user with email and password.
 *
 * @description
 * Dispatches `loginUseCase` with user credentials.
 * On success, stores the auth response in `auth.login.data`.
 * On failure, stores the backend `Failure` in `auth.login.error`.
 */
export const loginAction = createAsyncThunk<
    IAuthResponse,
    ILoginCredentials,
    { rejectValue: Failure }
>(ActionType.AuthLogin, async (credentials: ILoginCredentials, { rejectWithValue }) => {
    const result = await container.cradle.loginUseCase.execute(credentials);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
