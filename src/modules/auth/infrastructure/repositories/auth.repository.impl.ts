import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import { AuthMapper } from "@/modules/auth/infrastructure/mappers/auth.mapper";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Authentication repository implementation using REST API.
 *
 * @description
 * Communicates with the backend API, maps DTOs to domain entities,
 * and wraps results in `Result<T>` — errors are converted to typed
 * Failure values via ProblemMapper.
 */
export class AuthRepositoryImpl implements IAuthRepositoryPort {
    async login(credentials: ILoginCredentials): Promise<Result<IAuthResponse>> {
        try {
            const response = await apiClient.api.adminLogin({
                email: credentials.email,
                password: credentials.password
            });
            return ok(AuthMapper.authResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async forgotPassword(
        credentials: IForgotPasswordCredentials
    ): Promise<Result<IForgotPasswordResponse>> {
        try {
            const response = await apiClient.api.adminForgotPassword({
                email: credentials.email
            });
            return ok(AuthMapper.forgotPasswordResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async verifyOtp(credentials: IVerifyOtpCredentials): Promise<Result<IVerifyOtpResponse>> {
        try {
            const response = await apiClient.api.adminVerifyOtp({
                email: credentials.email,
                code: credentials.otp,
                purpose: credentials.purpose
            });
            return ok(AuthMapper.verifyOtpResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async resendOtp(credentials: IResendOtpCredentials): Promise<Result<IResendOtpResponse>> {
        try {
            const response = await apiClient.api.adminResendOtp({
                email: credentials.email,
                purpose: credentials.purpose
            });
            return ok(AuthMapper.resendOtpResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async resetPassword(
        credentials: IResetPasswordCredentials
    ): Promise<Result<IResetPasswordResponse>> {
        try {
            const response = await apiClient.api.adminResetPassword({
                email: credentials.email,
                code: credentials.code,
                newPassword: credentials.newPassword
            });
            return ok(AuthMapper.resetPasswordResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async signOut(): Promise<Result<ISignOutResponse>> {
        try {
            const response = await apiClient.api.adminSignOut({});
            return ok(AuthMapper.signOutResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async signOutAll(): Promise<Result<ISignOutAllResponse>> {
        try {
            const response = await apiClient.api.adminSignOutFromAllDevices();
            return ok(AuthMapper.signOutAllResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
