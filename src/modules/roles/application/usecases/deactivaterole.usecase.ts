import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivateRoleUseCase
 * @extends {IResultUseCase<string, IRoleEntity>}
 */
interface IDeactivateRoleUseCase extends IResultUseCase<string, IRoleEntity> {}

/**
 * Use case for deactivating an active role.
 *
 * @class DeactivateRoleUseCase
 * @implements {IDeactivateRoleUseCase}
 *
 * @description
 * Sets a role's `isActive` flag to `false`. Users with this role
 * lose the associated permissions. Fails with 409 if already inactive.
 */
export class DeactivateRoleUseCase implements IDeactivateRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the deactivate role use case.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.deactivate(id);
    }
}
