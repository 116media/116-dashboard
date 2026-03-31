import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRevokeSessionUseCase
 * @extends {IResultUseCase<string, IRevokeSessionResponse>}
 */
interface IRevokeSessionUseCase extends IResultUseCase<string, IRevokeSessionResponse> {}

/**
 * Use case for revoking a specific login session.
 *
 * @class RevokeSessionUseCase
 * @implements {IRevokeSessionUseCase}
 *
 * @description
 * Invalidates a session by its ID, immediately disconnecting
 * the corresponding device.
 */
export class RevokeSessionUseCase implements IRevokeSessionUseCase {
    private readonly sessionRepository: SessionRepositoryPort;

    /**
     * @param {SessionRepositoryPort} sessionRepository - Repository for session operations (injected)
     */
    constructor({ sessionRepository }: { sessionRepository: SessionRepositoryPort }) {
        this.sessionRepository = sessionRepository;
    }

    /**
     * Executes the revoke session use case.
     *
     * @param {string} sessionId - The ID of the session to revoke
     * @returns {Promise<Result<IRevokeSessionResponse>>} `ok(IRevokeSessionResponse)` on success, `err(Failure)` on failure
     */
    async execute(sessionId: string): Promise<Result<IRevokeSessionResponse>> {
        return this.sessionRepository.revokeSession(sessionId);
    }
}
