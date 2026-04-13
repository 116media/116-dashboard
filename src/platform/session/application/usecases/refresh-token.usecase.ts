import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IRefreshTokenUseCase extends IUseCase<void, void> {}

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    private readonly sessionRepository: SessionRepositoryPort;

    constructor({ sessionRepository }: { sessionRepository: SessionRepositoryPort }) {
        this.sessionRepository = sessionRepository;
    }

    async execute(): Promise<void> {
        await this.sessionRepository.refreshToken();
    }
}
