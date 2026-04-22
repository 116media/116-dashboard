import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";

import type { IUploadShortThumbnailCredentials } from "@/modules/shorts/presentation/model/IUploadShortThumbnailCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUploadShortThumbnailUseCase
 * @extends {IResultUseCase<{ id: string; data: IUploadShortThumbnailCredentials }, IShortVideoEntity>}
 */
interface IUploadShortThumbnailUseCase
    extends IResultUseCase<
        { id: string; data: IUploadShortThumbnailCredentials },
        IShortVideoEntity
    > {}

/**
 * Use case for uploading a thumbnail to a short video.
 *
 * @class UploadShortThumbnailUseCase
 * @implements {IUploadShortThumbnailUseCase}
 *
 * @description
 * Uploads a thumbnail image file and associates it with a short video
 * via the shorts repository.
 */
export class UploadShortThumbnailUseCase implements IUploadShortThumbnailUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;
    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }
    /**
     * Executes the upload short thumbnail use case.
     *
     * @param {object} request - The short video ID and thumbnail file data
     * @returns {Promise<Result<IShortVideoEntity>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUploadShortThumbnailCredentials;
    }): Promise<Result<IShortVideoEntity>> {
        return this.shortsRepository.uploadShortThumbnail(request.id, request.data);
    }
}
