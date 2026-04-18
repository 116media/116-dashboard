import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IShortsQueryParams } from "@/modules/shorts/presentation/model/IShortsQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllShortsUseCase
 * @extends {IResultUseCase<IShortsQueryParams, IPaginatedResult<IShortVideoEntity>>}
 */
interface IGetAllShortsUseCase
    extends IResultUseCase<IShortsQueryParams, IPaginatedResult<IShortVideoEntity>> {}

/**
 * Use case for fetching all short videos.
 *
 * @class GetAllShortsUseCase
 * @implements {IGetAllShortsUseCase}
 *
 * @description
 * Retrieves a paginated list of short videos with optional search
 * filter via the shorts repository.
 */
export class GetAllShortsUseCase implements IGetAllShortsUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;
    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }
    /**
     * Executes the get all shorts use case.
     *
     * @param {IShortsQueryParams} params - Pagination and search parameters
     * @returns {Promise<Result<IPaginatedResult<IShortVideoEntity>>>} `ok(IPaginatedResult<IShortVideoEntity>)` on success, `err(Failure)` on failure
     */
    async execute(
        params: IShortsQueryParams
    ): Promise<Result<IPaginatedResult<IShortVideoEntity>>> {
        return this.shortsRepository.getAllShorts(params);
    }
}
