import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISubmitVideoUseCase
 * @extends {IResultUseCase<string, IVideoActionResponse>}
 */
interface ISubmitVideoUseCase extends IResultUseCase<string, IVideoActionResponse> {}

/**
 * Use case for submitting a video for review.
 *
 * @class SubmitVideoUseCase
 * @implements {ISubmitVideoUseCase}
 *
 * @description
 * Submits a draft video for editorial review, transitioning its status
 * via the videos repository.
 */
export class SubmitVideoUseCase implements ISubmitVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the submit video use case.
     *
     * @param {string} params - The unique identifier of the video to submit
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.submitVideo(params);
    }
}
