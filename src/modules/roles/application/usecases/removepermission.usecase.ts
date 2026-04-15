import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemovePermissionUseCase
 * @extends {IResultUseCase<{ roleId: string; permissionId: string }, IRoleWithPermissions>}
 */
interface IRemovePermissionUseCase
    extends IResultUseCase<{ roleId: string; permissionId: string }, IRoleWithPermissions> {}

/**
 * Use case for removing a single permission from a role.
 *
 * @class RemovePermissionUseCase
 * @implements {IRemovePermissionUseCase}
 *
 * @description
 * Removes a permission from the role's permission set.
 * Fails with 400 if not assigned, 404 if role or permission not found.
 */
export class RemovePermissionUseCase implements IRemovePermissionUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the remove permission use case.
     *
     * @param {{ roleId: string; permissionId: string }} request - Role and permission UUIDs
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    async execute(request: { roleId: string; permissionId: string }): Promise<Result<IRoleWithPermissions>> {
        return this.rolesRepository.removePermission(request.roleId, request.permissionId);
    }
}
