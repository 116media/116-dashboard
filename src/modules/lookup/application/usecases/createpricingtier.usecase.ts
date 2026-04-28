import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreatePricingTierUseCase
 * @extends {IResultUseCase<{ name: string; description: string }, IPricingTierEntity>}
 */
interface ICreatePricingTierUseCase
    extends IResultUseCase<{ name: string; description: string }, IPricingTierEntity> {}

/**
 * Use case for creating a new pricing tier.
 *
 * @class CreatePricingTierUseCase
 * @implements {ICreatePricingTierUseCase}
 */
export class CreatePricingTierUseCase implements ICreatePricingTierUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the create pricing tier use case.
     *
     * @param {{ name: string; description: string }} data - Pricing tier name and optional description
     * @returns {Promise<Result<IPricingTierEntity>>} `ok(IPricingTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: {
        name: string;
        description: string;
    }): Promise<Result<IPricingTierEntity>> {
        return this.lookupRepository.createPricingTier(data);
    }
}
