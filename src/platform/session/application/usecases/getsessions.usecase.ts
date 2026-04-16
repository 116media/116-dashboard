import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetSessionsUseCase
 * @extends {IResultUseCase<void, ISession[]>}
 */
interface IGetSessionsUseCase extends IResultUseCase<void, ISession[]> {}

/**
 * Use case for fetching the current user's active sessions.
 *
 * @class GetSessionsUseCase
 * @implements {IGetSessionsUseCase}
 *
 * @description
 * Retrieves the list of all active login sessions for the
 * authenticated user across all devices.
 */
export class GetSessionsUseCase implements IGetSessionsUseCase {
    private readonly sessionRepository: SessionRepositoryPort;

    /**
     * @param {SessionRepositoryPort} sessionRepository - Repository for session operations (injected)
     */
    constructor({ sessionRepository }: { sessionRepository: SessionRepositoryPort }) {
        this.sessionRepository = sessionRepository;
    }

    /**
     * Executes the get sessions use case.
     *
     * @returns {Promise<Result<ISession[]>>} `ok(ISession[])` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<ISession[]>> {
        return this.sessionRepository.getSessions();
    }
}
