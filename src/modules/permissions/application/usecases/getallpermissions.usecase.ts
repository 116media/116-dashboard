import type { IPermissionsRepositoryPort } from "@/modules/permissions/application/repositories/permissions.repository.port";
import type { IPermissionPaginatedResult } from "@/modules/permissions/domain/entities/IPermissionPaginatedResult";
import type { IPermissionsQueryParams } from "@/modules/permissions/presentation/model/IPermissionsQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllPermissionsUseCase
 * @extends {IResultUseCase<IPermissionsQueryParams, IPermissionPaginatedResult>}
 */
interface IGetAllPermissionsUseCase
    extends IResultUseCase<IPermissionsQueryParams, IPermissionPaginatedResult> {}

/**
 * Use case for fetching a paginated list of permissions.
 *
 * @class GetAllPermissionsUseCase
 * @implements {IGetAllPermissionsUseCase}
 *
 * @description
 * Supports server-side pagination, search, and status filtering.
 */
export class GetAllPermissionsUseCase implements IGetAllPermissionsUseCase {
    private readonly permissionsRepository: IPermissionsRepositoryPort;

    /**
     * @param {IPermissionsRepositoryPort} permissionsRepository - Repository for permission operations (injected)
     */
    constructor({ permissionsRepository }: { permissionsRepository: IPermissionsRepositoryPort }) {
        this.permissionsRepository = permissionsRepository;
    }

    /**
     * Executes the get all permissions use case.
     *
     * @param {IPermissionsQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IPermissionPaginatedResult>>} `ok(IPermissionPaginatedResult)` on success, `err(Failure)` on failure
     */
    async execute(params: IPermissionsQueryParams): Promise<Result<IPermissionPaginatedResult>> {
        return this.permissionsRepository.getAll(params);
    }
}
