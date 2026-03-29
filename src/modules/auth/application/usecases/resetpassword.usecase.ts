import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IResetPasswordResponse } from "@/modules/auth/domain/entities/IResetPasswordResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

/**
 * Interface for the reset password use case.
 *
 * @interface IResetPasswordUseCase
 * @extends {IUseCase<IResetPasswordCredentials, IResetPasswordResponse>}
 */
interface IResetPasswordUseCase
    extends IUseCase<IResetPasswordCredentials, IResetPasswordResponse> {}

/**
 * Reset password use case implementing business logic for password reset.
 *
 * @class ResetPasswordUseCase
 * @implements {IResetPasswordUseCase}
 *
 * @description
 * Orchestrates the reset password flow:
 * 1. Sends password reset request via repository
 * 2. Clears stored OTP code on success
 * 3. Returns reset success status
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class ResetPasswordUseCase implements IResetPasswordUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * Creates a new ResetPasswordUseCase instance.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository implementation for data access
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the reset password use case.
     *
     * @param {IResetPasswordCredentials} credentials - User email, OTP code, and new password
     * @returns {Promise<IResetPasswordResponse>} Success status of the password reset
     * @throws {IApiProblemDetails} When the reset fails (invalid credentials, expired OTP, etc.)
     */
    async execute(credentials: IResetPasswordCredentials): Promise<IResetPasswordResponse> {
        const response = await this.authRepository.resetPassword(credentials);

        // Clear the stored OTP code after successful password reset
        AuthStorageService.clearOtpCode();

        return response;
    }
}
