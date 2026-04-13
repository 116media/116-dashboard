import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

/**
 * Action to reset reset password state.
 *
 * @returns Redux action to clear reset password error and loading states
 */
export const resetResetPasswordAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthResetPassword });

/**
 * Async thunk action for resetting user password.
 *
 * @description
 * Dispatches reset password request through the reset password use case.
 *
 * Handles success and error states automatically via Redux Toolkit.
 *
 * @param {IResetPasswordCredentials} credentials - User email, OTP code, and new password
 * @returns {Promise<IResetPasswordResponse>} Success status
 * @throws {IApiProblemDetails} API error details on failure
 */
export const resetPasswordAction = createAsyncThunk<
    IResetPasswordResponse,
    IResetPasswordCredentials,
    { rejectValue: IApiProblemDetails }
>(
    ActionType.AuthResetPassword,
    async (credentials: IResetPasswordCredentials, { rejectWithValue }) => {
        try {
            const otpCode = AuthStorageService.getOtpCode();
            const response = await container.cradle.resetPasswordUseCase.execute({
                ...credentials,
                code: otpCode as string
            });
            return response;
        } catch (error) {
            return rejectWithValue(error as IApiProblemDetails);
        }
    }
);
