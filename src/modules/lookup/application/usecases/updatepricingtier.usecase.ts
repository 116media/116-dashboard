import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdatePricingTierUseCase
 * @extends {IResultUseCase<{ id: string; data: { name: string; description: string } }, IPricingTierEntity>}
 */
interface IUpdatePricingTierUseCase
    extends IResultUseCase<
        { id: string; data: { name: string; description: string } },
        IPricingTierEntity
    > {}

/**
 * Use case for updating an existing pricing tier.
 *
 * @class UpdatePricingTierUseCase
 * @implements {IUpdatePricingTierUseCase}
 */
export class UpdatePricingTierUseCase implements IUpdatePricingTierUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the update pricing tier use case.
     *
     * @param {{ id: string; data: { name: string; description: string } }} input - Pricing tier ID and update payload
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(input: {
        id: string;
        data: { name: string; description: string };
    }): Promise<Result<IPricingTierEntity>> {
        return this.lookupRepository.updatePricingTier(input.id, input.data);
    }
}
