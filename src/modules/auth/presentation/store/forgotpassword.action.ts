import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

/**
 * Action to reset forgot password state.
 *
 * @returns Redux action to clear forgot password error and loading states
 */
export const resetForgotPasswordAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthForgotPassword });

/**
 * Async thunk action for initiating password reset.
 *
 * @description
 * Dispatches forgot password request through the forgot password use case.
 *
 * Handles success and error states automatically via Redux Toolkit.
 *
 * @param {IForgotPasswordCredentials} credentials - User email
 * @returns {Promise<IForgotPasswordResponse>} Success status
 * @throws {IApiProblemDetails} API error details on failure
 */
export const forgotPasswordAction = createAsyncThunk<
    IForgotPasswordResponse,
    IForgotPasswordCredentials,
    { rejectValue: IApiProblemDetails }
>(
    ActionType.AuthForgotPassword,
    async (credentials: IForgotPasswordCredentials, { rejectWithValue }) => {
        try {
            const response = await container.cradle.forgotPasswordUseCase.execute(credentials);
            return response;
        } catch (error) {
            return rejectWithValue(error as IApiProblemDetails);
        }
    }
);
