import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRestoreRoleUseCase
 * @extends {IResultUseCase<string, IRoleEntity>}
 */
interface IRestoreRoleUseCase extends IResultUseCase<string, IRoleEntity> {}

/**
 * Use case for restoring a soft-deleted role.
 *
 * @class RestoreRoleUseCase
 * @implements {IRestoreRoleUseCase}
 *
 * @description
 * Sets isDeleted=false and deletedAt=null. The role can then
 * be reactivated. Fails with 409 if the role is not deleted.
 */
export class RestoreRoleUseCase implements IRestoreRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the restore role use case.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.restore(id);
    }
}
