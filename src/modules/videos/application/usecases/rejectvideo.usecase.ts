import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRejectVideoUseCase
 * @extends {IResultUseCase<{ id: string; data: IRejectVideoCredentials }, IVideoActionResponse>}
 */
interface IRejectVideoUseCase
    extends IResultUseCase<{ id: string; data: IRejectVideoCredentials }, IVideoActionResponse> {}

/**
 * Use case for rejecting a video.
 *
 * @class RejectVideoUseCase
 * @implements {IRejectVideoUseCase}
 *
 * @description
 * Rejects a submitted video with a specified reason, returning it
 * to draft status via the videos repository.
 */
export class RejectVideoUseCase implements IRejectVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the reject video use case.
     *
     * @param {object} request - The video ID and rejection reason
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IRejectVideoCredentials;
    }): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.rejectVideo(request.id, request.data);
    }
}
