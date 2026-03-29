import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

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
 * 2. Returns authentication response (user data persisted via encrypted redux-persist)
 *
 * Token delivery is handled by the server via HttpOnly cookies —
 * no client-side token storage is needed.
 *
 * @remarks
 * Part of the application layer in Clean Architecture.
 * Contains business rules independent of frameworks and UI.
 */
export class LoginUseCase implements ILoginUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * Creates an instance of LoginUseCase.
     *
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the login use case.
     *
     * @param {ILoginCredentials} credentials - Email and password
     * @returns {Promise<IAuthResponse>} User data
     * @throws {IApiProblemDetails} When authentication fails
     */
    async execute(credentials: ILoginCredentials): Promise<IAuthResponse> {
        return await this.authRepository.login(credentials);
    }
}
