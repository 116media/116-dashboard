import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISoftDeleteRoleUseCase
 * @extends {IResultUseCase<string, IRoleEntity>}
 */
interface ISoftDeleteRoleUseCase extends IResultUseCase<string, IRoleEntity> {}

/**
 * Use case for soft-deleting a role.
 *
 * @class SoftDeleteRoleUseCase
 * @implements {ISoftDeleteRoleUseCase}
 *
 * @description
 * Marks a role as deleted (isDeleted=true, isActive=false) without
 * removing it from the database. The role can be restored later.
 * Fails with 409 if already deleted, 400 if core role.
 */
export class SoftDeleteRoleUseCase implements ISoftDeleteRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * Executes the soft delete role use case.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.softDelete(id);
    }
}
