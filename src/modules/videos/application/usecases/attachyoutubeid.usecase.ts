import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IAttachYoutubeIdCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeIdCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAttachYoutubeIdUseCase
 * @extends {IResultUseCase<{ id: string; data: IAttachYoutubeIdCredentials }, IVideoEntity>}
 */
interface IAttachYoutubeIdUseCase
    extends IResultUseCase<{ id: string; data: IAttachYoutubeIdCredentials }, IVideoEntity> {}

/**
 * Use case for attaching a YouTube video identifier to a video.
 *
 * @class AttachYoutubeIdUseCase
 * @implements {IAttachYoutubeIdUseCase}
 *
 * @description
 * Attaches a YouTube video ID to a video entity, linking the
 * platform video record to its YouTube counterpart via the videos repository.
 */
export class AttachYoutubeIdUseCase implements IAttachYoutubeIdUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the attach YouTube ID use case.
     *
     * @param {object} request - The video ID and YouTube video ID to attach
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IAttachYoutubeIdCredentials }): Promise<Result<IVideoEntity>> {
        return this.videosRepository.attachYoutubeId(request.id, request.data);
    }
}
