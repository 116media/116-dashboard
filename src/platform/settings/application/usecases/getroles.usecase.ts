import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface IGetRolesUseCase extends IUseCase<void, IRoleWithPermissions[]> {}

export class GetRolesUseCase implements IGetRolesUseCase {
    constructor(private readonly settingsRepository: ISettingsRepositoryPort) {}

    async execute(): Promise<IRoleWithPermissions[]> {
        return this.settingsRepository.getRoles();
    }
}
