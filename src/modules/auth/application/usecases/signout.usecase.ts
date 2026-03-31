import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISignOutUseCase
 * @extends {IResultUseCase<void, ISignOutResponse>}
 */
interface ISignOutUseCase extends IResultUseCase<void, ISignOutResponse> {}

/**
 * Use case for signing out the current session.
 *
 * @class SignOutUseCase
 * @implements {ISignOutUseCase}
 *
 * @description
 * Invalidates the current session on the server.
 * The backend reads the refresh token from the HttpOnly cookie.
 */
export class SignOutUseCase implements ISignOutUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the sign-out use case.
     *
     * @returns {Promise<Result<ISignOutResponse>>} `ok(ISignOutResponse)` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<ISignOutResponse>> {
        return this.authRepository.signOut();
    }
}
