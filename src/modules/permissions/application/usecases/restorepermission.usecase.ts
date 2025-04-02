import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRestorePermissionUseCase
 * @extends {IResultUseCase<string, IPermissionEntity>}
 */
interface IRestorePermissionUseCase extends IResultUseCase<string, IPermissionEntity> {}

/**
 * Use case for restoring a soft-deleted permission.
 *
 * @class RestorePermissionUseCase
 * @implements {IRestorePermissionUseCase}
 *
 * @description
 * Sets isDeleted=false and deletedAt=null.
 * Returns 409 if the permission is not deleted.
 */
export class RestorePermissionUseCase implements IRestorePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the restore permission use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.restore(id);
    }
}
