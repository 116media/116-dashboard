import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IApproveVideoUseCase
 * @extends {IResultUseCase<string, IVideoActionResponse>}
 */
interface IApproveVideoUseCase extends IResultUseCase<string, IVideoActionResponse> {}

/**
 * Use case for approving a video.
 *
 * @class ApproveVideoUseCase
 * @implements {IApproveVideoUseCase}
 *
 * @description
 * Approves a submitted video, marking it as ready for publication
 * via the videos repository.
 */
export class ApproveVideoUseCase implements IApproveVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the approve video use case.
     *
     * @param {string} params - The unique identifier of the video to approve
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.approveVideo(params);
    }
}
