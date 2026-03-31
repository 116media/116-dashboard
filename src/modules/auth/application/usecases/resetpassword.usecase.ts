import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IResetPasswordUseCase
 * @extends {IResultUseCase<IResetPasswordCredentials, IResetPasswordResponse>}
 */
interface IResetPasswordUseCase
    extends IResultUseCase<IResetPasswordCredentials, IResetPasswordResponse> {}

/**
 * Use case for resetting the user's password.
 *
 * @class ResetPasswordUseCase
 * @implements {IResetPasswordUseCase}
 *
 * @description
 * Resets the password via the repository and clears the locally
 * stored OTP code on success.
 */
export class ResetPasswordUseCase implements IResetPasswordUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the reset password use case.
     *
     * @param {IResetPasswordCredentials} credentials - User email, OTP code, and new password
     * @returns {Promise<Result<IResetPasswordResponse>>} `ok(IResetPasswordResponse)` on success, `err(Failure)` on failure
     */
    async execute(credentials: IResetPasswordCredentials): Promise<Result<IResetPasswordResponse>> {
        const result = await this.authRepository.resetPassword(credentials);

        if (result.ok) {
            AuthStorageService.clearOtpCode();
        }

        return result;
    }
}
