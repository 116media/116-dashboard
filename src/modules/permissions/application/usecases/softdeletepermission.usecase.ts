import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISoftDeletePermissionUseCase
 * @extends {IResultUseCase<string, IPermissionEntity>}
 */
interface ISoftDeletePermissionUseCase extends IResultUseCase<string, IPermissionEntity> {}

/**
 * Use case for soft-deleting a permission.
 *
 * @class SoftDeletePermissionUseCase
 * @implements {ISoftDeletePermissionUseCase}
 *
 * @description
 * Marks the permission as deleted without removing it from the
 * database. Can be restored later.
 */
export class SoftDeletePermissionUseCase implements ISoftDeletePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the soft delete permission use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.softDelete(id);
    }
}
