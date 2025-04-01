import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleActionResponse } from "@/modules/roles/domain/entities/IRoleActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IHardDeleteRoleUseCase
 * @extends {IResultUseCase<string, IRoleActionResponse>}
 */
interface IHardDeleteRoleUseCase extends IResultUseCase<string, IRoleActionResponse> {}

/**
 * Use case for permanently deleting a role.
 *
 * @class HardDeleteRoleUseCase
 * @implements {IHardDeleteRoleUseCase}
 *
 * @description
 * Permanently removes a role and cascades to UserRole and
 * RolePermission junction tables. This action is irreversible.
 * Fails with 400 if core role, 404 if not found.
 */
export class HardDeleteRoleUseCase implements IHardDeleteRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the hard delete role use case.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleActionResponse>>} `ok(IRoleActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleActionResponse>> {
        return this.rolesRepository.hardDelete(id);
    }
}
