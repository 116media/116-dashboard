import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivatePermissionUseCase
 * @extends {IResultUseCase<string, IPermissionEntity>}
 */
interface IActivatePermissionUseCase extends IResultUseCase<string, IPermissionEntity> {}

/**
 * Use case for activating an inactive permission.
 *
 * @class ActivatePermissionUseCase
 * @implements {IActivatePermissionUseCase}
 *
 * @description
 * Sets the permission's isActive flag to true.
 * Returns 409 if already active.
 */
export class ActivatePermissionUseCase implements IActivatePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the activate permission use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.activate(id);
    }
}
