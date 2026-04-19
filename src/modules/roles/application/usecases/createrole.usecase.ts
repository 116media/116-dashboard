import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { ICreateRoleCredentials } from "@/modules/roles/presentation/model/ICreateRoleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateRoleUseCase
 * @extends {IResultUseCase<ICreateRoleCredentials, IRoleEntity>}
 */
interface ICreateRoleUseCase extends IResultUseCase<ICreateRoleCredentials, IRoleEntity> {}

/**
 * Use case for creating a new role.
 *
 * @class CreateRoleUseCase
 * @implements {ICreateRoleUseCase}
 */
export class CreateRoleUseCase implements ICreateRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * @param {ICreateRoleCredentials} data - Role name and description
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: ICreateRoleCredentials): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.create(data);
    }
}
