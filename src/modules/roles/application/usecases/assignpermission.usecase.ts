import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAssignPermissionUseCase
 * @extends {IResultUseCase<{ roleId: string; permissionId: string }, IRoleWithPermissions>}
 */
interface IAssignPermissionUseCase
    extends IResultUseCase<{ roleId: string; permissionId: string }, IRoleWithPermissions> {}

/**
 * Use case for assigning a single permission to a role.
 *
 * @class AssignPermissionUseCase
 * @implements {IAssignPermissionUseCase}
 *
 * @description
 * Adds a permission to the role's permission set. Fails with 409
 * if the permission is already assigned, 404 if role or permission
 * not found.
 */
export class AssignPermissionUseCase implements IAssignPermissionUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the assign permission use case.
     *
     * @param {{ roleId: string; permissionId: string }} request - Role and permission UUIDs
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        roleId: string;
        permissionId: string;
    }): Promise<Result<IRoleWithPermissions>> {
        return this.rolesRepository.assignPermission(request.roleId, request.permissionId);
    }
}
