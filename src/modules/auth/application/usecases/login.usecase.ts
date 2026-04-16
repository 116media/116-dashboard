import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { IAuthResponse } from "@/modules/auth/domain/entities/IAuthResponse";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ILoginUseCase
 * @extends {IResultUseCase<ILoginCredentials, IAuthResponse>}
 */
interface ILoginUseCase extends IResultUseCase<ILoginCredentials, IAuthResponse> {}

/**
 * Use case for authenticating a user with email and password.
 *
 * @class LoginUseCase
 * @implements {ILoginUseCase}
 *
 * @description
 * Token delivery is handled by the server via HttpOnly cookies —
 * no client-side token storage is needed.
 */
export class LoginUseCase implements ILoginUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the login use case.
     *
     * @param {ILoginCredentials} credentials - User email and password
     * @returns {Promise<Result<IAuthResponse>>} `ok(IAuthResponse)` with user data on success, `err(Failure)` on failure
     */
    async execute(credentials: ILoginCredentials): Promise<Result<IAuthResponse>> {
        return this.authRepository.login(credentials);
    }
}
