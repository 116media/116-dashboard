import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IUpdateVideoTagsCredentials } from "@/modules/videos/presentation/model/IUpdateVideoTagsCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateVideoTagsUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateVideoTagsCredentials }, IVideoActionResponse>}
 */
interface IUpdateVideoTagsUseCase
    extends IResultUseCase<
        { id: string; data: IUpdateVideoTagsCredentials },
        IVideoActionResponse
    > {}

/**
 * Use case for updating a video's tags.
 *
 * @class UpdateVideoTagsUseCase
 * @implements {IUpdateVideoTagsUseCase}
 *
 * @description
 * Updates the set of tags associated with a video
 * via the videos repository.
 */
export class UpdateVideoTagsUseCase implements IUpdateVideoTagsUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the update video tags use case.
     *
     * @param {object} request - The video ID and tag IDs to assign
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(IVideoActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUpdateVideoTagsCredentials }): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.updateVideoTags(request.id, request.data);
    }
}
