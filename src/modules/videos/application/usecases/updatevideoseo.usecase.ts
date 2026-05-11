import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateVideoSeoUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateVideoSeoCredentials }, IVideoEntity>}
 */
interface IUpdateVideoSeoUseCase
    extends IResultUseCase<{ id: string; data: IUpdateVideoSeoCredentials }, IVideoEntity> {}

/**
 * Use case for updating a video's SEO metadata.
 *
 * @class UpdateVideoSeoUseCase
 * @implements {IUpdateVideoSeoUseCase}
 *
 * @description
 * Updates the SEO meta title and meta description for a video
 * via the videos repository.
 */
export class UpdateVideoSeoUseCase implements IUpdateVideoSeoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the update video SEO use case.
     *
     * @param {object} request - The video ID and SEO metadata
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdateVideoSeoCredentials;
    }): Promise<Result<IVideoEntity>> {
        return this.videosRepository.updateVideoSeo(request.id, request.data);
    }
}
