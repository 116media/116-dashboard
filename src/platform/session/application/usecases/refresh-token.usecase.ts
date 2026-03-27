import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IRefreshTokenUseCase extends IUseCase<void, void> {}

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(private readonly sessionRepository: SessionRepositoryPort) {}

    async execute(): Promise<void> {
        await this.sessionRepository.refreshToken();
    }
}
