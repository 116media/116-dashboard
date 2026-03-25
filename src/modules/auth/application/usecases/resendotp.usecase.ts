import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

/**
 * Interface for the resend OTP use case.
 *
 * @interface IResendOtpUseCase
 * @extends {IUseCase<IResendOtpCredentials, IResendOtpResponse>}
 */
interface IResendOtpUseCase extends IUseCase<IResendOtpCredentials, IResendOtpResponse> {}

/**
 * Resend OTP use case implementing business logic for OTP resend.
 *
 * @class ResendOtpUseCase
 * @implements {IResendOtpUseCase}
 *
 * @description
 * Orchestrates the resend OTP flow:
 * 1. Sends OTP resend request via repository
 * 2. Returns resend success status
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class ResendOtpUseCase implements IResendOtpUseCase {
    /**
     * Creates an instance of ResendOtpUseCase.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor(private readonly authRepository: IAuthRepositoryPort) {}

    /**
     * Executes the resend OTP use case.
     *
     * @param {IResendOtpCredentials} credentials - User email and purpose
     * @returns {Promise<IResendOtpResponse>} Resend success status
     * @throws {IApiProblemDetails} When the request fails
     */
    async execute(credentials: IResendOtpCredentials): Promise<IResendOtpResponse> {
        const response = await this.authRepository.resendOtp(credentials);
        return response;
    }
}
