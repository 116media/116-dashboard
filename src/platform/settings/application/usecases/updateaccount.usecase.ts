import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IUpdateAccountUseCase extends IUseCase<IUpdateAccountCredentials, IUser> {}

export class UpdateAccountUseCase implements IUpdateAccountUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    async execute(data: IUpdateAccountCredentials): Promise<IUser> {
        return this.settingsRepository.updateAccount(data);
    }
}
