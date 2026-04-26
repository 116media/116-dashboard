import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreatePromotionLevelUseCase
 * @extends {IResultUseCase<{ name: string; durationDays: number; priceUsd: number }, IPromotionLevelEntity>}
 */
interface ICreatePromotionLevelUseCase
    extends IResultUseCase<
        { name: string; durationDays: number; priceUsd: number },
        IPromotionLevelEntity
    > {}

/**
 * Use case for creating a new promotion level.
 *
 * @class CreatePromotionLevelUseCase
 * @implements {ICreatePromotionLevelUseCase}
 */
export class CreatePromotionLevelUseCase implements ICreatePromotionLevelUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the create promotion level use case.
     *
     * @param {{ name: string; durationDays: number; priceUsd: number }} data - Promotion level creation payload
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: {
        name: string;
        durationDays: number;
        priceUsd: number;
    }): Promise<Result<IPromotionLevelEntity>> {
        return this.lookupRepository.createPromotionLevel(data);
    }
}
