import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivateShortUseCase
 * @extends {IResultUseCase<string, IShortActionResponse>}
 */
interface IDeactivateShortUseCase extends IResultUseCase<string, IShortActionResponse> {}

/**
 * Use case for deactivating a short video.
 *
 * @class DeactivateShortUseCase
 * @implements {IDeactivateShortUseCase}
 *
 * @description
 * Deactivates a short video by its unique identifier
 * via the shorts repository.
 */
export class DeactivateShortUseCase implements IDeactivateShortUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;
    /**
     * @param {IShortsRepositoryPort} shortsRepository - Repository for shorts operations (injected)
     */
    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }
    /**
     * Executes the deactivate short use case.
     *
     * @param {string} params - The unique identifier of the short video to deactivate
     * @returns {Promise<Result<IShortActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IShortActionResponse>> {
        return this.shortsRepository.deactivateShort(params);
    }
}
