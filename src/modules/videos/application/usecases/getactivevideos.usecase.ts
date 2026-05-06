import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetActiveVideosUseCase
 * @extends {IResultUseCase<void, IVideoSummaryEntity[]>}
 */
interface IGetActiveVideosUseCase extends IResultUseCase<void, IVideoSummaryEntity[]> {}

/**
 * Use case for fetching all active videos.
 *
 * @class GetActiveVideosUseCase
 * @implements {IGetActiveVideosUseCase}
 *
 * @description
 * Retrieves an unpaginated list of active video summaries
 * (excludes Archived and Rejected) via the videos repository.
 */
export class GetActiveVideosUseCase implements IGetActiveVideosUseCase {
    private readonly videosRepository: IVideosRepositoryPort;

    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }

    async execute(): Promise<Result<IVideoSummaryEntity[]>> {
        return this.videosRepository.getActiveVideos();
    }
}
