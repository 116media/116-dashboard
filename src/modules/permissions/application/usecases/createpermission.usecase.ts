import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreatePermissionUseCase
 * @extends {IResultUseCase<ICreatePermissionCredentials, IPermissionEntity>}
 */
interface ICreatePermissionUseCase
    extends IResultUseCase<ICreatePermissionCredentials, IPermissionEntity> {}

/**
 * Use case for creating a new permission.
 *
 * @class CreatePermissionUseCase
 * @implements {ICreatePermissionUseCase}
 *
 * @description
 * Creates a permission with a resource, action, and description.
 * Returns 409 if the resource+action combination already exists.
 */
export class CreatePermissionUseCase implements ICreatePermissionUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the create permission use case.
     *
     * @param {ICreatePermissionCredentials} data - Resource, action, and description
     * @returns {Promise<Result<IPermissionEntity>>} `ok(IPermissionEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: ICreatePermissionCredentials): Promise<Result<IPermissionEntity>> {
        return this.permissionsRepository.create(data);
    }
}
