import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IVerifyOtpUseCase
 * @extends {IResultUseCase<IVerifyOtpCredentials, IVerifyOtpResponse>}
 */
interface IVerifyOtpUseCase extends IResultUseCase<IVerifyOtpCredentials, IVerifyOtpResponse> {}

/**
 * Use case for verifying an OTP code.
 *
 * @class VerifyOtpUseCase
 * @implements {IVerifyOtpUseCase}
 *
 * @description
 * Verifies the OTP code via the repository and stores it locally
 * on success for subsequent use in the password reset flow.
 */
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the verify OTP use case.
     *
     * @param {IVerifyOtpCredentials} credentials - User email, OTP code, and purpose
     * @returns {Promise<Result<IVerifyOtpResponse>>} `ok(IVerifyOtpResponse)` on success, `err(Failure)` on failure
     */
    async execute(credentials: IVerifyOtpCredentials): Promise<Result<IVerifyOtpResponse>> {
        const result = await this.authRepository.verifyOtp(credentials);

        if (result.ok) AuthStorageService.setOtpCode(credentials.otp);

        return result;
    }
}
