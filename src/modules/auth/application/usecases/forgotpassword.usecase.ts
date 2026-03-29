import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IForgotPasswordResponse } from "@/modules/auth/domain/entities/IForgotPasswordResponse";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

/**
 * Interface for the forgot password use case.
 *
 * @interface IForgotPasswordUseCase
 * @extends {IUseCase<IForgotPasswordCredentials, IForgotPasswordResponse>}
 */
interface IForgotPasswordUseCase
    extends IUseCase<IForgotPasswordCredentials, IForgotPasswordResponse> {}

/**
 * Forgot password use case implementing business logic for password reset initiation.
 *
 * @class ForgotPasswordUseCase
 * @implements {IForgotPasswordUseCase}
 *
 * @description
 * Orchestrates the forgot password flow:
 * 1. Sends password reset request via repository
 * 2. Returns success status
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * Creates an instance of ForgotPasswordUseCase.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the forgot password use case.
     *
     * @param {IForgotPasswordCredentials} credentials - User email
     * @returns {Promise<IForgotPasswordResponse>} Success status
     * @throws {IApiProblemDetails} When the request fails
     */
    async execute(credentials: IForgotPasswordCredentials): Promise<IForgotPasswordResponse> {
        const response = await this.authRepository.forgotPassword(credentials);
        return response;
    }
}
