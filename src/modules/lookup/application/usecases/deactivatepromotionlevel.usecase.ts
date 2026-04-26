import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivatePromotionLevelUseCase
 * @extends {IResultUseCase<string, IPromotionLevelEntity>}
 */
interface IDeactivatePromotionLevelUseCase extends IResultUseCase<string, IPromotionLevelEntity> {}

/**
 * Use case for deactivating an active promotion level.
 *
 * @class DeactivatePromotionLevelUseCase
 * @implements {IDeactivatePromotionLevelUseCase}
 */
export class DeactivatePromotionLevelUseCase implements IDeactivatePromotionLevelUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the deactivate promotion level use case.
     *
     * @param {string} id - Promotion level UUID
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPromotionLevelEntity>> {
        return this.lookupRepository.deactivatePromotionLevel(id);
    }
}
