import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateShortUseCase
 * @extends {IResultUseCase<ICreateShortCredentials, IShortVideoEntity>}
 */
interface ICreateShortUseCase extends IResultUseCase<ICreateShortCredentials, IShortVideoEntity> {}

/**
 * Use case for creating a new short video.
 *
 * @class CreateShortUseCase
 * @implements {ICreateShortUseCase}
 *
 * @description
 * Creates a new short video with the specified title, slug, video file,
 * and optional videoId via the shorts repository.
 */
export class CreateShortUseCase implements ICreateShortUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;
    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }
    /**
     * Executes the create short use case.
     *
     * @param {ICreateShortCredentials} params - Short video creation parameters
     * @returns {Promise<Result<IShortVideoEntity>>} `ok(IShortVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateShortCredentials): Promise<Result<IShortVideoEntity>> {
        return this.shortsRepository.createShort(params);
    }
}
