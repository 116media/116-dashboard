import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetResendOtpAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthResendOtp });

/**
 * Async thunk to resend a new OTP code to the user's email.
 *
 * @description
 * Sends a new OTP code for the specified purpose via
 * `resendOtpUseCase`.
 */
export const resendOtpAction = createAsyncThunk<
    IResendOtpResponse,
    IResendOtpCredentials,
    { rejectValue: Failure }
>(ActionType.AuthResendOtp, async (credentials: IResendOtpCredentials, { rejectWithValue }) => {
    const result = await container.cradle.resendOtpUseCase.execute(credentials);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
