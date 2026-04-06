import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IRevokeSessionUseCase extends IUseCase<string, IRevokeSessionResponse> {}

export class RevokeSessionUseCase implements IRevokeSessionUseCase {
    constructor(private readonly sessionRepository: SessionRepositoryPort) {}

    async execute(sessionId: string): Promise<IRevokeSessionResponse> {
        return this.sessionRepository.revokeSession(sessionId);
    }
}
