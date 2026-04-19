import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator.ts";

export const resetVerifyOtpAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthVerifyOtp });

/**
 * Async thunk to verify an OTP code.
 *
 * @description
 * Verifies the OTP code for the given purpose (password reset,
 * email verification, etc.) via `verifyOtpUseCase`.
 */
export const verifyOtpAction = createAsyncThunk<
    IVerifyOtpResponse,
    IVerifyOtpCredentials,
    { rejectValue: Failure }
>(ActionType.AuthVerifyOtp, async (credentials: IVerifyOtpCredentials, { rejectWithValue }) => {
    const result = await container.cradle.verifyOtpUseCase.execute(credentials);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
