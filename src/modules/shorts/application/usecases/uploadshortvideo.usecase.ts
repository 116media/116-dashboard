import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IUploadShortVideoCredentials } from "@/modules/shorts/presentation/model/IUploadShortVideoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUploadShortVideoUseCase
 * @extends {IResultUseCase<{ id: string; data: IUploadShortVideoCredentials }, IShortVideoEntity>}
 */
interface IUploadShortVideoUseCase
    extends IResultUseCase<{ id: string; data: IUploadShortVideoCredentials }, IShortVideoEntity> {}

/**
 * Use case for uploading (or replacing) the video file of a short video.
 *
 * @class UploadShortVideoUseCase
 * @implements {IUploadShortVideoUseCase}
 *
 * @description
 * Uploads a video file and attaches it to an existing short video draft via the shorts
 * repository, making the draft eligible for activation.
 */
export class UploadShortVideoUseCase implements IUploadShortVideoUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;

    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }

    /**
     * Executes the upload short video use case.
     *
     * @param {object} request - The short video ID and video file data
     * @returns {Promise<Result<IShortVideoEntity>>} `ok(IShortVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUploadShortVideoCredentials;
    }): Promise<Result<IShortVideoEntity>> {
        return this.shortsRepository.uploadShortVideo(request.id, request.data);
    }
}
