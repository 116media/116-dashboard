import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionActionResponse } from "@/modules/permissions/domain/entities/IPermissionActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IHardDeletePermissionUseCase
 * @extends {IResultUseCase<string, IPermissionActionResponse>}
 */
interface IHardDeletePermissionUseCase extends IResultUseCase<string, IPermissionActionResponse> {}

/**
 * Use case for permanently deleting a permission.
 *
 * @class HardDeletePermissionUseCase
 * @implements {IHardDeletePermissionUseCase}
 *
 * @description
 * Permanently removes the permission from the database.
 * This action is irreversible.
 */
export class HardDeletePermissionUseCase implements IHardDeletePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the hard delete permission use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionActionResponse>>} `ok(IPermissionActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionActionResponse>> {
        return this.permissionsRepository.hardDelete(id);
    }
}
