import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IUploadVideoThumbnailCredentials } from "@/modules/videos/presentation/model/IUploadVideoThumbnailCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUploadVideoThumbnailUseCase
 * @extends {IResultUseCase<{ id: string; data: IUploadVideoThumbnailCredentials }, IVideoEntity>}
 */
interface IUploadVideoThumbnailUseCase
    extends IResultUseCase<{ id: string; data: IUploadVideoThumbnailCredentials }, IVideoEntity> {}

/**
 * Use case for uploading a thumbnail image to a video.
 *
 * @class UploadVideoThumbnailUseCase
 * @implements {IUploadVideoThumbnailUseCase}
 *
 * @description
 * Uploads a thumbnail image file and associates it with a video
 * via the videos repository.
 */
export class UploadVideoThumbnailUseCase implements IUploadVideoThumbnailUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the upload video thumbnail use case.
     *
     * @param {object} request - The video ID and thumbnail file data
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUploadVideoThumbnailCredentials }): Promise<Result<IVideoEntity>> {
        return this.videosRepository.uploadVideoThumbnail(request.id, request.data);
    }
}
