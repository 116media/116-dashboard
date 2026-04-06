import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import type { IUnknownObject } from "@/shared/domain/entities/IUnknownObject";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Auth slice state type definition.
 *
 * @description
 * Defines the shape of the auth Redux slice state.
 *
 * Contains state for all authentication-related operations with properly typed data.
 */
export type IAuthState = {
    login: IBasicInitialState<IAuthResponse>;
    forgotPassword: IBasicInitialState<IForgotPasswordResponse>;
    verifyOtp: IBasicInitialState<IVerifyOtpResponse>;
    resendOtp: IBasicInitialState<IResendOtpResponse>;
    resetPassword: IBasicInitialState<IResetPasswordResponse>;
    signOut: IBasicInitialState<ISignOutResponse>;
    signOutAll: IBasicInitialState<ISignOutAllResponse>;
    updateAvatar: IBasicInitialState<IUnknownObject>;
    updateAccount: IBasicInitialState<IUnknownObject>;
    changePassword: IBasicInitialState<IUnknownObject>;
};
