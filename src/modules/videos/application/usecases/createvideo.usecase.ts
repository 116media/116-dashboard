import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateVideoUseCase
 * @extends {IResultUseCase<ICreateVideoCredentials, IVideoEntity>}
 */
interface ICreateVideoUseCase extends IResultUseCase<ICreateVideoCredentials, IVideoEntity> {}

/**
 * Use case for creating a new video.
 *
 * @class CreateVideoUseCase
 * @implements {ICreateVideoUseCase}
 *
 * @description
 * Creates a new video with the specified category, title, slug, description,
 * and optional customer/order item/scheduling associations via the videos repository.
 */
export class CreateVideoUseCase implements ICreateVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the create video use case.
     *
     * @param {ICreateVideoCredentials} params - Video creation parameters
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateVideoCredentials): Promise<Result<IVideoEntity>> {
        return this.videosRepository.createVideo(params);
    }
}
