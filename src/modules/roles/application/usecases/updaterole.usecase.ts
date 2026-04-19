import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { IUpdateRoleCredentials } from "@/modules/roles/presentation/model/IUpdateRoleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateRoleUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateRoleCredentials }, IRoleEntity>}
 */
interface IUpdateRoleUseCase
    extends IResultUseCase<{ id: string; data: IUpdateRoleCredentials }, IRoleEntity> {}

/**
 * Use case for updating an existing role.
 *
 * @class UpdateRoleUseCase
 * @implements {IUpdateRoleUseCase}
 */
export class UpdateRoleUseCase implements IUpdateRoleUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * @param {{ id: string; data: IUpdateRoleCredentials }} params - Role ID and fields to update
     * @returns {Promise<Result<IRoleEntity>>} `ok(IRoleEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        id: string;
        data: IUpdateRoleCredentials;
    }): Promise<Result<IRoleEntity>> {
        return this.rolesRepository.update(params.id, params.data);
    }
}
