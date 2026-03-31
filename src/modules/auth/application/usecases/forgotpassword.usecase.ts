import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IForgotPasswordUseCase
 * @extends {IResultUseCase<IForgotPasswordCredentials, IForgotPasswordResponse>}
 */
interface IForgotPasswordUseCase
    extends IResultUseCase<IForgotPasswordCredentials, IForgotPasswordResponse> {}

/**
 * Use case for initiating the password reset process.
 *
 * @class ForgotPasswordUseCase
 * @implements {IForgotPasswordUseCase}
 *
 * @description
 * Sends a password reset OTP to the user's email address.
 */
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the forgot password use case.
     *
     * @param {IForgotPasswordCredentials} credentials - User email for password reset
     * @returns {Promise<Result<IForgotPasswordResponse>>} `ok(IForgotPasswordResponse)` on success, `err(Failure)` on failure
     */
    async execute(
        credentials: IForgotPasswordCredentials
    ): Promise<Result<IForgotPasswordResponse>> {
        return this.authRepository.forgotPassword(credentials);
    }
}
