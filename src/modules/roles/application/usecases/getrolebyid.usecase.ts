import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetRoleByIdUseCase
 * @extends {IResultUseCase<string, IRoleWithPermissions>}
 */
interface IGetRoleByIdUseCase extends IResultUseCase<string, IRoleWithPermissions> {}

/**
 * Use case for fetching a single role by ID with its permissions.
 *
 * @class GetRoleByIdUseCase
 * @implements {IGetRoleByIdUseCase}
 */
export class GetRoleByIdUseCase implements IGetRoleByIdUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IRoleWithPermissions>> {
        return this.rolesRepository.getById(id);
    }
}
