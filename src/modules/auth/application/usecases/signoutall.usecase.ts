import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ISignOutAllResponse } from "@/modules/auth/domain/entities/ISignOutAllResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISignOutAllUseCase
 * @extends {IResultUseCase<void, ISignOutAllResponse>}
 */
interface ISignOutAllUseCase extends IResultUseCase<void, ISignOutAllResponse> {}

/**
 * Use case for signing out from all devices.
 *
 * @class SignOutAllUseCase
 * @implements {ISignOutAllUseCase}
 *
 * @description
 * Invalidates all active sessions for the current user across
 * every device.
 */
export class SignOutAllUseCase implements ISignOutAllUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    /**
     * @param {IAuthRepositoryPort} authRepository - Repository for auth operations (injected)
     */
    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    /**
     * Executes the sign-out-all use case.
     *
     * @returns {Promise<Result<ISignOutAllResponse>>} `ok(ISignOutAllResponse)` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<ISignOutAllResponse>> {
        return this.authRepository.signOutAll();
    }
}
