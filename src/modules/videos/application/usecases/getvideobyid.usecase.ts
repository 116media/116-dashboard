import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetVideoByIdUseCase
 * @extends {IResultUseCase<string, IVideoEntity>}
 */
interface IGetVideoByIdUseCase extends IResultUseCase<string, IVideoEntity> {}

/**
 * Use case for fetching a single video by its ID.
 *
 * @class GetVideoByIdUseCase
 * @implements {IGetVideoByIdUseCase}
 *
 * @description
 * Retrieves the full detail of a video by its unique identifier
 * via the videos repository.
 */
export class GetVideoByIdUseCase implements IGetVideoByIdUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the get video by ID use case.
     *
     * @param {string} params - The unique identifier of the video to fetch
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoEntity>> {
        return this.videosRepository.getVideoById(params);
    }
}
