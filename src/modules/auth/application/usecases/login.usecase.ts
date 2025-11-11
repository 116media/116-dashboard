import type { IUseCase } from "@/core/application/IUseCase";
import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";

/**
 * Interface for the login use case.
 *
 * @interface ILoginUseCase
 * @extends {IUseCase<ILoginCredentials, IAuthResponse>}
 */
interface ILoginUseCase extends IUseCase<ILoginCredentials, IAuthResponse> {}

/**
 * Login use case implementing business logic for user authentication.
 *
 * @class LoginUseCase
 * @implements {ILoginUseCase}
 *
 * @description
 * Orchestrates the login flow:
 * 1. Authenticates user via repository
 * 2. Stores authentication token in localStorage
 * 3. Returns authentication response (user data persisted via encrypted redux-persist)
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class LoginUseCase implements ILoginUseCase {
    /**
     * Creates an instance of LoginUseCase.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor(private readonly authRepository: IAuthRepositoryPort) {}

    /**
     * Executes the login use case.
     *
     * @param {ILoginCredentials} credentials - Email and password
     * @returns {Promise<IAuthResponse>} Token and user data
     * @throws {IApiProblemDetails} When authentication fails
     */
    async execute(credentials: ILoginCredentials): Promise<IAuthResponse> {
        const response = await this.authRepository.login(credentials);
        AuthStorageService.setToken(response.token);

        return response;
    }
}
