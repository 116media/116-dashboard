import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IVerifyOtpResponse } from "@/modules/auth/domain/entities/IVerifyOtpResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

/**
 * Interface for the verify OTP use case.
 *
 * @interface IVerifyOtpUseCase
 * @extends {IUseCase<IVerifyOtpCredentials, IVerifyOtpResponse>}
 */
interface IVerifyOtpUseCase extends IUseCase<IVerifyOtpCredentials, IVerifyOtpResponse> {}

/**
 * Verify OTP use case implementing business logic for OTP verification.
 *
 * @class VerifyOtpUseCase
 * @implements {IVerifyOtpUseCase}
 *
 * @description
 * Orchestrates the verify OTP flow:
 * 1. Sends OTP verification request via repository
 * 2. Returns verification success status
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    /**
     * Creates an instance of VerifyOtpUseCase.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor(private readonly authRepository: IAuthRepositoryPort) {}

    /**
     * Executes the verify OTP use case.
     *
     * @param {IVerifyOtpCredentials} credentials - User email, OTP code, and purpose
     * @returns {Promise<IVerifyOtpResponse>} Verification success status
     * @throws {IApiProblemDetails} When the verification fails
     */
    async execute(credentials: IVerifyOtpCredentials): Promise<IVerifyOtpResponse> {
        const response = await this.authRepository.verifyOtp(credentials);

        // Store the otp code data
        AuthStorageService.setOtpCode(credentials.otp);

        return response;
    }
}
