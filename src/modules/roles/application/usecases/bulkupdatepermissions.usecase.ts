import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IBulkUpdatePermissionsUseCase
 * @extends {IResultUseCase<{ roleId: string; permissionIds: string[] }, IRoleWithPermissions>}
 */
interface IBulkUpdatePermissionsUseCase
    extends IResultUseCase<{ roleId: string; permissionIds: string[] }, IRoleWithPermissions> {}

/**
 * Use case for replacing all permissions on a role.
 *
 * @class BulkUpdatePermissionsUseCase
 * @implements {IBulkUpdatePermissionsUseCase}
 *
 * @description
 * Sends the full list of desired permission IDs. The backend
 * adds new ones and removes those not in the list.
 */
export class BulkUpdatePermissionsUseCase implements IBulkUpdatePermissionsUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the bulk update permissions use case.
     *
     * @param {{ roleId: string; permissionIds: string[] }} request - Role UUID and desired permission UUIDs
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        roleId: string;
        permissionIds: string[];
    }): Promise<Result<IRoleWithPermissions>> {
        return this.rolesRepository.bulkUpdatePermissions(request.roleId, request.permissionIds);
    }
}
