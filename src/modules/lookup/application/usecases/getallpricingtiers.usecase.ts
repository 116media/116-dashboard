import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllPricingTiersUseCase
 * @extends {IResultUseCase<void, IPricingTierEntity[]>}
 */
interface IGetAllPricingTiersUseCase extends IResultUseCase<void, IPricingTierEntity[]> {}

/**
 * Use case for fetching all pricing tiers.
 *
 * @class GetAllPricingTiersUseCase
 * @implements {IGetAllPricingTiersUseCase}
 */
export class GetAllPricingTiersUseCase implements IGetAllPricingTiersUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the get all pricing tiers use case.
     *
     * @returns {Promise<Result<IPricingTierEntity[]>>} `ok(IPricingTierEntity[])` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<IPricingTierEntity[]>> {
        return this.lookupRepository.getAllPricingTiers();
    }
}
