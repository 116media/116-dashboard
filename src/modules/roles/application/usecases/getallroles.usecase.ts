import type { IRolesRepositoryPort } from "@/modules/roles/application/repositories/roles.repository.port";
import type { IRolePaginatedResult } from "@/modules/roles/domain/entities/IRolePaginatedResult";
import type { IRolesQueryParams } from "@/modules/roles/presentation/model/IRolesQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllRolesUseCase
 * @extends {IResultUseCase<IRolesQueryParams, IRolePaginatedResult>}
 */
interface IGetAllRolesUseCase extends IResultUseCase<IRolesQueryParams, IRolePaginatedResult> {}

/**
 * Use case for fetching a paginated list of roles.
 *
 * @class GetAllRolesUseCase
 * @implements {IGetAllRolesUseCase}
 *
 * @description
 * Supports server-side pagination, search, and status filtering.
 */
export class GetAllRolesUseCase implements IGetAllRolesUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) {
        this.rolesRepository = rolesRepository;
    }

    /**
     * @param {IRolesQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IRolePaginatedResult>>} `ok(IRolePaginatedResult)` on success, `err(Failure)` on failure
     */
    async execute(params: IRolesQueryParams): Promise<Result<IRolePaginatedResult>> {
        return this.rolesRepository.getAll(params);
    }
}
