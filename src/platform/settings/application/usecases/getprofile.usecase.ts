import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IGetProfileUseCase extends IUseCase<void, IUser> {}

export class GetProfileUseCase implements IGetProfileUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    async execute(): Promise<IUser> {
        return this.settingsRepository.getProfile();
    }
}
