import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IPublishVideoUseCase
 * @extends {IResultUseCase<string, IVideoActionResponse>}
 */
interface IPublishVideoUseCase extends IResultUseCase<string, IVideoActionResponse> {}

/**
 * Use case for publishing a video.
 *
 * @class PublishVideoUseCase
 * @implements {IPublishVideoUseCase}
 *
 * @description
 * Publishes an approved video, making it publicly visible
 * via the videos repository.
 */
export class PublishVideoUseCase implements IPublishVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the publish video use case.
     *
     * @param {string} params - The unique identifier of the video to publish
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.publishVideo(params);
    }
}
