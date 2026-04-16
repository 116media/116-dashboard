import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

/**
 * @interface IRefreshTokenUseCase
 * @extends {IUseCase<void, void>}
 */
interface IRefreshTokenUseCase extends IUseCase<void, void> {}

/**
 * Use case for refreshing the access token.
 *
 * @class RefreshTokenUseCase
 * @implements {IRefreshTokenUseCase}
 *
 * @description
 * Requests a new access token using the refresh token stored in an
 * HttpOnly cookie. Used by the access token expiry interceptor.
 *
 * @remarks
 * This use case stays Promise-based (no Result wrapper) because it is
 * consumed by interceptors that rely on throw-based error propagation.
 */
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    private readonly sessionRepository: SessionRepositoryPort;

    /**
     * @param {SessionRepositoryPort} sessionRepository - Repository for session operations (injected)
     */
    constructor({ sessionRepository }: { sessionRepository: SessionRepositoryPort }) {
        this.sessionRepository = sessionRepository;
    }

    /**
     * Executes the token refresh.
     *
     * @returns {Promise<void>} Resolves on success, throws on failure
     */
    async execute(): Promise<void> {
        await this.sessionRepository.refreshToken();
    }
}
