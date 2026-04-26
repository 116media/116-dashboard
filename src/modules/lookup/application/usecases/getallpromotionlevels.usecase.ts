import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllPromotionLevelsUseCase
 * @extends {IResultUseCase<void, IPromotionLevelEntity[]>}
 */
interface IGetAllPromotionLevelsUseCase extends IResultUseCase<void, IPromotionLevelEntity[]> {}

/**
 * Use case for fetching all promotion levels.
 *
 * @class GetAllPromotionLevelsUseCase
 * @implements {IGetAllPromotionLevelsUseCase}
 */
export class GetAllPromotionLevelsUseCase implements IGetAllPromotionLevelsUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the get all promotion levels use case.
     *
     * @returns {Promise<Result<IPromotionLevelEntity[]>>} `ok(IPromotionLevelEntity[])` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<IPromotionLevelEntity[]>> {
        return this.lookupRepository.getAllPromotionLevels();
    }
}
