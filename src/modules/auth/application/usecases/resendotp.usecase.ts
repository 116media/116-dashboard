import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IResendOtpResponse } from "@/modules/auth/domain/entities/IResendOtpResponse";
import type { IResendOtpCredentials } from "@/modules/auth/presentation/model/IResendOtpCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IResendOtpUseCase
 * @extends {IResultUseCase<IResendOtpCredentials, IResendOtpResponse>}
 */
interface IResendOtpUseCase extends IResultUseCase<IResendOtpCredentials, IResendOtpResponse> {}

/**
 * Use case for resending a new OTP code.
 *
 * @class ResendOtpUseCase
 * @implements {IResendOtpUseCase}
 *
 * @description
 * Sends a new OTP code to the user's email for the specified purpose
 * (password reset, email verification, etc.).
 */
export class ResendOtpUseCase implements IResendOtpUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the resend OTP use case.
     *
     * @param {IResendOtpCredentials} credentials - User email and OTP purpose
     * @returns {Promise<Result<IResendOtpResponse>>} `ok(IResendOtpResponse)` on success, `err(Failure)` on failure
     */
    async execute(credentials: IResendOtpCredentials): Promise<Result<IResendOtpResponse>> {
        return this.authRepository.resendOtp(credentials);
    }
}
