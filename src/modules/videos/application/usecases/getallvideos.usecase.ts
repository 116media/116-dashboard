import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IVideosQueryParams } from "@/modules/videos/presentation/model/IVideosQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllVideosUseCase
 * @extends {IResultUseCase<IVideosQueryParams, IPaginatedResult<IVideoSummaryEntity>>}
 */
interface IGetAllVideosUseCase
    extends IResultUseCase<IVideosQueryParams, IPaginatedResult<IVideoSummaryEntity>> {}

/**
 * Use case for fetching all videos.
 *
 * @class GetAllVideosUseCase
 * @implements {IGetAllVideosUseCase}
 *
 * @description
 * Retrieves a paginated list of video summaries with optional filters
 * for status, category, and search term via the videos repository.
 */
export class GetAllVideosUseCase implements IGetAllVideosUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the get all videos use case.
     *
     * @param {IVideosQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IPaginatedResult<IVideoSummaryEntity>>>} `ok(IPaginatedResult<IVideoSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(
        params: IVideosQueryParams
    ): Promise<Result<IPaginatedResult<IVideoSummaryEntity>>> {
        return this.videosRepository.getAllVideos(params);
    }
}
