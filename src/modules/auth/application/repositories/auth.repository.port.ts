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

/**
 * Repository port (interface) for authentication operations.
 *
 * @interface IAuthRepositoryPort
 *
 * @description
 * Defines the contract for authentication data access.
 *
 * Following the Ports & Adapters architecture pattern,
 * this port is implemented by infrastructure layer adapters.
 *
 * @remarks
 * This abstraction allows the application layer to remain independent
 * of specific data sources (REST API, GraphQL, mock data, etc.)
 */
export interface IAuthRepositoryPort {
    /**
     * Authenticates a user with email and password.
     *
     * @param {ILoginCredentials} credentials - User login credentials
     * @returns {Promise<IAuthResponse>} Authentication response with token and user data
     * @throws {IApiProblemDetails} When authentication fails
     */
    login(credentials: ILoginCredentials): Promise<IAuthResponse>;

    /**
     * Initiates password reset process for a user.
     *
     * @param {IForgotPasswordCredentials} credentials - User email for password reset
     * @returns {Promise<IForgotPasswordResponse>} Success status of the request
     * @throws {IApiProblemDetails} When the request fails
     */
    forgotPassword(credentials: IForgotPasswordCredentials): Promise<IForgotPasswordResponse>;

    /**
     * Verifies OTP code for various purposes (password reset, email verification, etc.).
     *
     * @param {IVerifyOtpCredentials} credentials - User email, OTP code, and purpose
     * @returns {Promise<IVerifyOtpResponse>} Success status of the verification
     * @throws {IApiProblemDetails} When the verification fails
     */
    verifyOtp(credentials: IVerifyOtpCredentials): Promise<IVerifyOtpResponse>;

    /**
     * Resends a new OTP code for various purposes (password reset, email verification, etc.).
     *
     * @param {IResendOtpCredentials} credentials - User email and purpose
     * @returns {Promise<IResendOtpResponse>} Success status of the resend request
     * @throws {IApiProblemDetails} When the request fails
     */
    resendOtp(credentials: IResendOtpCredentials): Promise<IResendOtpResponse>;

    /**
     * Resets user password with email, OTP code, and new password.
     *
     * @param {IResetPasswordCredentials} credentials - User email, OTP code, and new password
     * @returns {Promise<IResetPasswordResponse>} Success status of the password reset
     * @throws {IApiProblemDetails} When the reset fails
     */
    resetPassword(credentials: IResetPasswordCredentials): Promise<IResetPasswordResponse>;

    /**
     * Signs out the current session.
     * The backend reads the refresh token from the HttpOnly cookie.
     *
     * @returns {Promise<ISignOutResponse>} Success status
     * @throws {IApiProblemDetails} When the request fails
     */
    signOut(): Promise<ISignOutResponse>;

    /**
     * Signs out from all devices.
     *
     * @returns {Promise<ISignOutAllResponse>} Success status
     * @throws {IApiProblemDetails} When the request fails
     */
    signOutAll(): Promise<ISignOutAllResponse>;
}
