import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResendOtpUseCase } from "@/modules/auth/application/usecases/resendotp.usecase";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const authRepository = new AuthRepositoryImpl();
const resendOtpUseCase = new ResendOtpUseCase(authRepository);

/**
 * Action to reset resend OTP state.
 *
 * @returns Redux action to clear resend OTP error and loading states
 */
export const resetResendOtpAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthResendOtp });

/**
 * Async thunk action for resending OTP.
 *
 * @description
 * Dispatches OTP resend request through the resend OTP use case.
 *
 * Handles success and error states automatically via Redux Toolkit.
 *
 * @param {IResendOtpCredentials} credentials - User email and purpose
 * @returns {Promise<IResendOtpResponse>} Resend success status
 * @throws {IApiProblemDetails} API error details on failure
 */
export const resendOtpAction = createAsyncThunk<
    IResendOtpResponse,
    IResendOtpCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthResendOtp, async (credentials: IResendOtpCredentials, { rejectWithValue }) => {
    try {
        const response = await resendOtpUseCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
