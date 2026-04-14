import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type {
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * @interface IListPaymentsUseCase
 * @extends {IResultUseCase<{ pageIndex: number; pageSize: number; status?: EnumPaymentStatus; method?: EnumPaymentMethod; search?: string }, IPaginatedResult<IPaymentSummaryEntity>>}
 */
interface IListPaymentsUseCase
    extends IResultUseCase<
        {
            pageIndex: number;
            pageSize: number;
            status?: EnumPaymentStatus;
            method?: EnumPaymentMethod;
            search?: string;
        },
        IPaginatedResult<IPaymentSummaryEntity>
    > {}

/**
 * Use case for listing all payments.
 *
 * @class ListPaymentsUseCase
 * @implements {IListPaymentsUseCase}
 *
 * @description
 * Retrieves a paginated list of payment records with optional
 * filters for payment status, method, and customer search.
 * Used by the Payments tab to display payment history.
 */
export class ListPaymentsUseCase implements IListPaymentsUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the list payments use case.
     *
     * @param {object} params - Pagination and optional filter parameters
     * @returns {Promise<Result<IPaginatedResult<IPaymentSummaryEntity>>>} `ok(IPaginatedResult<IPaymentSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        status?: EnumPaymentStatus;
        method?: EnumPaymentMethod;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPaymentSummaryEntity>>> {
        return this.commerceRepository.listPayments(params);
    }
}
