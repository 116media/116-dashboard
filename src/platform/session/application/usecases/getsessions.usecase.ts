import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IGetSessionsUseCase extends IUseCase<void, ISession[]> {}

export class GetSessionsUseCase implements IGetSessionsUseCase {
    private readonly sessionRepository: SessionRepositoryPort;

    constructor({ sessionRepository }: { sessionRepository: SessionRepositoryPort }) {
        this.sessionRepository = sessionRepository;
    }

    async execute(): Promise<ISession[]> {
        return this.sessionRepository.getSessions();
    }
}
