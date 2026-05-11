import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IUpdatePermissionCredentials } from "@/modules/permissions/presentation/model/IUpdatePermissionCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdatePermissionUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdatePermissionCredentials }, IPermissionEntity>}
 */
interface IUpdatePermissionUseCase
    extends IResultUseCase<{ id: string; data: IUpdatePermissionCredentials }, IPermissionEntity> {}

/**
 * Use case for updating an existing permission.
 *
 * @class UpdatePermissionUseCase
 * @implements {IUpdatePermissionUseCase}
 */
export class UpdatePermissionUseCase implements IUpdatePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the update permission use case.
     *
     * @param {{ id: string; data: IUpdatePermissionCredentials }} request - Permission ID and fields to update
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdatePermissionCredentials;
    }): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.update(request.id, request.data);
    }
}
