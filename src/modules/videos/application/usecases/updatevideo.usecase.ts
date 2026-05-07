import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateVideoUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateVideoCredentials }, IVideoEntity>}
 */
interface IUpdateVideoUseCase
    extends IResultUseCase<{ id: string; data: IUpdateVideoCredentials }, IVideoEntity> {}

/**
 * Use case for updating an existing video.
 *
 * @class UpdateVideoUseCase
 * @implements {IUpdateVideoUseCase}
 *
 * @description
 * Updates an existing video's content, metadata, and configuration
 * via the videos repository.
 */
export class UpdateVideoUseCase implements IUpdateVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the update video use case.
     *
     * @param {object} request - The video ID and updated data
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUpdateVideoCredentials }): Promise<Result<IVideoEntity>> {
        return this.videosRepository.updateVideo(request.id, request.data);
    }
}
