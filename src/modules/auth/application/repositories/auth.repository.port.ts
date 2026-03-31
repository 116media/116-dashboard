import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import type { Result } from "@/shared/domain/results/result";

/**
 * Repository port (interface) for authentication operations.
 *
 * @description
 * Defines the contract for authentication data access.
 * All methods return `Result<T>` — errors are represented as
 * typed `Failure` values, never thrown.
 */
export interface IAuthRepositoryPort {
    /**
     * Authenticates a user with email and password.
     *
     * @param credentials - User login credentials
     * @returns `ok(IAuthResponse)` on success, `err(Failure)` on failure
     */
    login(credentials: ILoginCredentials): Promise<Result<IAuthResponse>>;

    /**
     * Initiates the password reset process by sending an OTP to the user's email.
     *
     * @param credentials - User email for password reset
     * @returns `ok(IForgotPasswordResponse)` on success, `err(Failure)` on failure
     */
    forgotPassword(
        credentials: IForgotPasswordCredentials
    ): Promise<Result<IForgotPasswordResponse>>;

    /**
     * Verifies an OTP code for a given purpose (password reset, email verification, etc.).
     *
     * @param credentials - User email, OTP code, and purpose
     * @returns `ok(IVerifyOtpResponse)` on success, `err(Failure)` on failure
     */
    verifyOtp(credentials: IVerifyOtpCredentials): Promise<Result<IVerifyOtpResponse>>;

    /**
     * Resends a new OTP code for a given purpose.
     *
     * @param credentials - User email and purpose
     * @returns `ok(IResendOtpResponse)` on success, `err(Failure)` on failure
     */
    resendOtp(credentials: IResendOtpCredentials): Promise<Result<IResendOtpResponse>>;

    /**
     * Resets the user's password using email, OTP code, and the new password.
     *
     * @param credentials - User email, OTP code, and new password
     * @returns `ok(IResetPasswordResponse)` on success, `err(Failure)` on failure
     */
    resetPassword(credentials: IResetPasswordCredentials): Promise<Result<IResetPasswordResponse>>;

    /**
     * Signs out the current session.
     * The backend reads the refresh token from the HttpOnly cookie.
     *
     * @returns `ok(ISignOutResponse)` on success, `err(Failure)` on failure
     */
    signOut(): Promise<Result<ISignOutResponse>>;

    /**
     * Signs out from all devices.
     *
     * @returns `ok(ISignOutAllResponse)` on success, `err(Failure)` on failure
     */
    signOutAll(): Promise<Result<ISignOutAllResponse>>;
}
