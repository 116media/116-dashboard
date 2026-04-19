import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetPermissionByIdUseCase
 * @extends {IResultUseCase<string, IPermissionEntity>}
 */
interface IGetPermissionByIdUseCase extends IResultUseCase<string, IPermissionEntity> {}

/**
 * Use case for fetching a single permission by ID.
 *
 * @class GetPermissionByIdUseCase
 * @implements {IGetPermissionByIdUseCase}
 */
export class GetPermissionByIdUseCase implements IGetPermissionByIdUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the get permission by ID use case.
     *
     * @param {string} id - Permission UUID
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.getById(id);
    }
}
