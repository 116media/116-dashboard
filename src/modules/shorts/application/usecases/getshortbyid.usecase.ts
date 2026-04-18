import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetShortByIdUseCase
 * @extends {IResultUseCase<string, IShortVideoEntity>}
 */
interface IGetShortByIdUseCase extends IResultUseCase<string, IShortVideoEntity> {}

/**
 * Use case for fetching a single short video by its ID.
 *
 * @class GetShortByIdUseCase
 * @implements {IGetShortByIdUseCase}
 *
 * @description
 * Retrieves the full detail of a short video by its unique identifier
 * via the shorts repository.
 */
export class GetShortByIdUseCase implements IGetShortByIdUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;
    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }
    /**
     * Executes the get short by ID use case.
     *
     * @param {string} params - The unique identifier of the short video to fetch
     * @returns {Promise<Result<IShortVideoEntity>>} `ok(IShortVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IShortVideoEntity>> {
        return this.shortsRepository.getShortById(params);
    }
}
