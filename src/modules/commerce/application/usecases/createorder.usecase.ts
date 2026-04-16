import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateOrderUseCase
 * @extends {IResultUseCase<ICreateOrderCredentials, IOrderSummaryEntity>}
 */
interface ICreateOrderUseCase
    extends IResultUseCase<ICreateOrderCredentials, IOrderSummaryEntity> {}

/**
 * Use case for creating a new content order.
 *
 * @class CreateOrderUseCase
 * @implements {ICreateOrderUseCase}
 *
 * @description
 * Opens a new content order for a B2B client via the commerce
 * repository. The order starts in Draft status and can optionally
 * be linked to a package.
 */
export class CreateOrderUseCase implements ICreateOrderUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the create order use case.
     *
     * @param {ICreateOrderCredentials} params - Order creation parameters
     * @returns {Promise<Result<IOrderSummaryEntity>>} `ok(IOrderSummaryEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateOrderCredentials): Promise<Result<IOrderSummaryEntity>> {
        return this.commerceRepository.createOrder(params);
    }
}
