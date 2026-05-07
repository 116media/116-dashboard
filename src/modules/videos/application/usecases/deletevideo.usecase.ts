import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeleteVideoUseCase
 * @extends {IResultUseCase<string, IVideoActionResponse>}
 */
interface IDeleteVideoUseCase extends IResultUseCase<string, IVideoActionResponse> {}

/**
 * Use case for deleting a video.
 *
 * @class DeleteVideoUseCase
 * @implements {IDeleteVideoUseCase}
 *
 * @description
 * Permanently deletes a video by its unique identifier
 * via the videos repository.
 */
export class DeleteVideoUseCase implements IDeleteVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the delete video use case.
     *
     * @param {string} params - The unique identifier of the video to delete
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.deleteVideo(params);
    }
}
