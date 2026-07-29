import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetRolesUseCase
 * @extends {IResultUseCase<void, IRoleWithPermissions[]>}
 */
interface IGetRolesUseCase extends IResultUseCase<void, IRoleWithPermissions[]> {}

/**
 * Use case for fetching the current user's roles and permissions.
 *
 * @class GetRolesUseCase
 * @implements {IGetRolesUseCase}
 *
 * @description
 * Retrieves the list of roles assigned to the authenticated user,
 * including the permissions associated with each role.
 */
export class GetRolesUseCase implements IGetRolesUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    /**
     * @param {ISettingsRepositoryPort} settingsRepository - Repository for settings operations (injected)
     */
    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * Executes the get roles use case.
     *
     * @returns {Promise<Result<IRoleWithPermissions[]>>} `ok(IRoleWithPermissions[])` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<IRoleWithPermissions[]>> {
        return this.settingsRepository.getOwnRoles();
    }
}
