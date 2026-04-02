import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivatePricingTierUseCase
 * @extends {IResultUseCase<string, IPricingTierEntity>}
 */
interface IDeactivatePricingTierUseCase extends IResultUseCase<string, IPricingTierEntity> {}

/**
 * Use case for deactivating an active pricing tier.
 *
 * @class DeactivatePricingTierUseCase
 * @implements {IDeactivatePricingTierUseCase}
 */
export class DeactivatePricingTierUseCase implements IDeactivatePricingTierUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the deactivate pricing tier use case.
     *
     * @param {string} id - Pricing tier UUID
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPricingTierEntity>> {
        return this.lookupRepository.deactivatePricingTier(id);
    }
}
