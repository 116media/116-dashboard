import { createAsyncThunk } from "@reduxjs/toolkit";
import { VerifyOtpUseCase } from "@/modules/auth/application/usecases/verifyotp.usecase";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

const authRepository = new AuthRepositoryImpl();
const verifyOtpUseCase = new VerifyOtpUseCase(authRepository);

/**
 * Action to reset verify OTP state.
 *
 * @returns Redux action to clear verify OTP error and loading states
 */
export const resetVerifyOtpAction = () =>
    authSlice.actions.clear({ context: ActionType.AuthVerifyOtp });

/**
 * Async thunk action for verifying OTP.
 *
 * @description
 * Dispatches OTP verification request through the verify OTP use case.
 *
 * Handles success and error states automatically via Redux Toolkit.
 *
 * @param {IVerifyOtpCredentials} credentials - User email, OTP code, and purpose
 * @returns {Promise<IVerifyOtpResponse>} Verification success status
 * @throws {IApiProblemDetails} API error details on failure
 */
export const verifyOtpAction = createAsyncThunk<
    IVerifyOtpResponse,
    IVerifyOtpCredentials,
    { rejectValue: IApiProblemDetails }
>(ActionType.AuthVerifyOtp, async (credentials: IVerifyOtpCredentials, { rejectWithValue }) => {
    try {
        const response = await verifyOtpUseCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
