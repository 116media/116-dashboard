import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IChangePasswordUseCase
    extends IUseCase<{ oldPassword: string; newPassword: string }, { isSuccess: boolean }> {}

export class ChangePasswordUseCase implements IChangePasswordUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    async execute(data: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{ isSuccess: boolean }> {
        return this.settingsRepository.changePassword(data);
    }
}
