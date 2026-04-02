import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivatePricingTierUseCase
 * @extends {IResultUseCase<string, IPricingTierEntity>}
 */
interface IActivatePricingTierUseCase extends IResultUseCase<string, IPricingTierEntity> {}

/**
 * Use case for activating an inactive pricing tier.
 *
 * @class ActivatePricingTierUseCase
 * @implements {IActivatePricingTierUseCase}
 */
export class ActivatePricingTierUseCase implements IActivatePricingTierUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the activate pricing tier use case.
     *
     * @param {string} id - Pricing tier UUID
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPricingTierEntity>> {
        return this.lookupRepository.activatePricingTier(id);
    }
}
