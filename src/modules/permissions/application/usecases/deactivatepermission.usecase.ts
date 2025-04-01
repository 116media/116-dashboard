import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivatePermissionUseCase
 * @extends {IResultUseCase<string, IPermissionEntity>}
 */
interface IDeactivatePermissionUseCase extends IResultUseCase<string, IPermissionEntity> {}

/**
 * Use case for deactivating an active permission.
 *
 * @class DeactivatePermissionUseCase
 * @implements {IDeactivatePermissionUseCase}
 *
 * @description
 * Sets the permission's isActive flag to false.
 * Returns 409 if already inactive.
 */
export class DeactivatePermissionUseCase implements IDeactivatePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the deactivate permission use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.deactivate(id);
    }
}
