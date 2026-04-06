import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IGetProfileUseCase extends IUseCase<void, IUser> {}

export class GetProfileUseCase implements IGetProfileUseCase {
    constructor(private readonly settingsRepository: ISettingsRepositoryPort) {}

    async execute(): Promise<IUser> {
        return this.settingsRepository.getProfile();
    }
}
