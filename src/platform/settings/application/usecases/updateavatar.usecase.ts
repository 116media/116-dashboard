import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IUpdateAvatarUseCase extends IUseCase<File, IUser> {}

export class UpdateAvatarUseCase implements IUpdateAvatarUseCase {
    constructor(private readonly settingsRepository: ISettingsRepositoryPort) {}

    async execute(file: File): Promise<IUser> {
        return this.settingsRepository.updateAvatar(file);
    }
}
