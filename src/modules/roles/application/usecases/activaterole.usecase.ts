import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivateRoleUseCase
 * @extends {IResultUseCase<string, IRoleEntity>}
 */
interface IActivateRoleUseCase extends IResultUseCase<string, IRoleEntity> {}

/**
 * Use case for activating an inactive role.
 *
 * @class ActivateRoleUseCase
 * @implements {IActivateRoleUseCase}
 *
 * @description
 * Sets a role's `isActive` flag to `true`. Fails with 409 if
 * the role is already active.
 */
export class ActivateRoleUseCase implements IActivateRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the activate role use case.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.activate(id);
    }
}
