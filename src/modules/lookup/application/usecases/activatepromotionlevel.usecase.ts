import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivatePromotionLevelUseCase
 * @extends {IResultUseCase<string, IPromotionLevelEntity>}
 */
interface IActivatePromotionLevelUseCase extends IResultUseCase<string, IPromotionLevelEntity> {}

/**
 * Use case for activating an inactive promotion level.
 *
 * @class ActivatePromotionLevelUseCase
 * @implements {IActivatePromotionLevelUseCase}
 */
export class ActivatePromotionLevelUseCase implements IActivatePromotionLevelUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the activate promotion level use case.
     *
     * @param {string} id - Promotion level UUID
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPromotionLevelEntity>> {
        return this.lookupRepository.activatePromotionLevel(id);
    }
}
