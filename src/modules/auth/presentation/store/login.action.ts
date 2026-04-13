import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

/**
 * Action to reset login state.
 *
 * @returns Redux action to clear login error and loading states
 */
export const resetLoginAction = () => authSlice.actions.clear({ context: ActionType.AuthLogin });

/**
 * Async thunk action for user login.
 *
 * @description
 * Dispatches login request through the login use case.
 *
 * Handles success and error states automatically via Redux Toolkit.
 *
 * @param {ILoginCredentials} credentials - User email and password
 * @returns {Promise<IAuthResponse>} Authentication response with token and user data
 * @throws {IApiProblemDetails} API error details on failure
 */
export const loginAction = createAsyncThunk<
    IAuthResponse,
    ILoginCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthLogin, async (credentials: ILoginCredentials, { rejectWithValue }) => {
    try {
        const response = await container.cradle.loginUseCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
