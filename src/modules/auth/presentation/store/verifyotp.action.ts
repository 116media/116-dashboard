import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import { authSlice } from "@/modules/auth/presentation/store";
import { ActionType } from "@/modules/auth/presentation/store/constants";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import container from "@/shared/infrastructure/service.locator.ts";

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
        const response = await container.cradle.verifyOtpUseCase.execute(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error as IApiProblemDetails);
    }
});
