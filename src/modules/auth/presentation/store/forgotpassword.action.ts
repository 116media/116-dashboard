import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetForgotPasswordAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthForgotPassword });

/**
 * Async thunk to initiate the password reset process.
 *
 * @description
 * Sends a password reset OTP to the user's email via
 * `forgotPasswordUseCase`.
 */
export const forgotPasswordAction = createAsyncThunk<
    IForgotPasswordResponse,
    IForgotPasswordCredentials,
    { rejectValue: Failure }
>(
    ActionType.AuthForgotPassword,
    async (credentials: IForgotPasswordCredentials, { rejectWithValue }) => {
        const result = await container.cradle.forgotPasswordUseCase.execute(credentials);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
