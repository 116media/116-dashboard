import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdatePromotionLevelUseCase
 * @extends {IResultUseCase<{ id: string; data: { name: string; durationDays: number; priceUsd: number } }, IPromotionLevelEntity>}
 */
interface IUpdatePromotionLevelUseCase
    extends IResultUseCase<
        { id: string; data: { name: string; durationDays: number; priceUsd: number } },
        IPromotionLevelEntity
    > {}

/**
 * Use case for updating an existing promotion level.
 *
 * @class UpdatePromotionLevelUseCase
 * @implements {IUpdatePromotionLevelUseCase}
 */
export class UpdatePromotionLevelUseCase implements IUpdatePromotionLevelUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the update promotion level use case.
     *
     * @param {{ id: string; data: { name: string; durationDays: number; priceUsd: number } }} input - Promotion level ID and update payload
     * @returns {Promise<Result<IPromotionLevelEntity>>} `ok(IPromotionLevelEntity)` on success, `err(Failure)` on failure
     */
    async execute(input: {
        id: string;
        data: { name: string; durationDays: number; priceUsd: number };
    }): Promise<Result<IPromotionLevelEntity>> {
        return this.lookupRepository.updatePromotionLevel(input.id, input.data);
    }
}
