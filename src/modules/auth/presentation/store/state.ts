import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IAuthState } from "./type";

/**
 * Initial state for the auth slice.
 *
 * @description
 * Defines initial state for all auth-related operations.
 *
 * Each operation follows the BasicInitialState pattern with data, loading, fetched, and error properties.
 */
export const authInitialState: IAuthState = {
    login: createInitialState<IAuthResponse>(),
    forgotPassword: createInitialState<IForgotPasswordResponse>(),
    verifyOtp: createInitialState<IVerifyOtpResponse>(),
    resendOtp: createInitialState<IResendOtpResponse>(),
    resetPassword: createInitialState<IResetPasswordResponse>(),
    signOut: createInitialState<ISignOutResponse>(),
    signOutAll: createInitialState<ISignOutAllResponse>(),
    updateAvatar: createInitialState(),
    updateAccount: createInitialState(),
    changePassword: createInitialState()
};
