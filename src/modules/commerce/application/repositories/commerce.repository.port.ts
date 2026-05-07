import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import type { IAddItemTierCredentials } from "@/modules/commerce/presentation/model/IAddItemTierCredentials";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import type { IAttachPaymentProofData } from "@/modules/commerce/presentation/model/IAttachPaymentProofData";
import type { ICreateOrderCredentials } from "@/modules/commerce/presentation/model/ICreateOrderCredentials";
import type { IEditItemCredentials } from "@/modules/commerce/presentation/model/IEditItemCredentials";
import type { IEditOrderCredentials } from "@/modules/commerce/presentation/model/IEditOrderCredentials";
import type { IOrdersQueryParams } from "@/modules/commerce/presentation/model/IOrdersQueryParams";
import type { IPaginationQueryParams } from "@/modules/commerce/presentation/model/IPaginationQueryParams";
import type { IPaymentsQueryParams } from "@/modules/commerce/presentation/model/IPaymentsQueryParams";
import type { IRejectPaymentCredentials } from "@/modules/commerce/presentation/model/IRejectPaymentCredentials";
import type { IVerifyPaymentCredentials } from "@/modules/commerce/presentation/model/IVerifyPaymentCredentials";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for commerce operations (orders and payments).
 *
 * @description
 * Defines the contract for order and payment data access.
 * All methods return `Result<T>` for typed error handling.
 */
export interface ICommerceRepositoryPort {
    /**
     * Creates a new content order for a B2B client.
     *
     * @param data - Customer ID and optional package ID
     * @returns The created order summary
     */
    createOrder(data: ICreateOrderCredentials): Promise<Result<IOrderSummaryEntity>>;

    /**
     * Adds a commissioned content item to a draft order.
     *
     * @param orderId - The order UUID
     * @param data - Item details (content kind, category, promotion, boosts)
     * @returns The created order item with tier snapshots
     */
    addItemToOrder(
        orderId: string,
        data: IAddOrderItemCredentials
    ): Promise<Result<IOrderItemEntity>>;

    /**
     * Attaches a pricing tier snapshot to an order item.
     *
     * @param orderId - The order UUID
     * @param itemId - The order item UUID
     * @param data - Pricing tier ID to attach
     * @returns The created tier snapshot
     */
    addTierToItem(
        orderId: string,
        itemId: string,
        data: IAddItemTierCredentials
    ): Promise<Result<IItemTierEntity>>;

    /**
     * Submits a draft order, transitioning it to PendingPayment status.
     *
     * @param id - The order UUID
     * @returns Success indicator
     */
    submitOrder(id: string): Promise<Result<ICommerceActionResponse>>;

    /**
     * Cancels a draft or pending-payment order.
     *
     * @param id - The order UUID
     * @returns Success indicator
     */
    cancelOrder(id: string): Promise<Result<ICommerceActionResponse>>;

    /**
     * Uploads a payment proof file and attaches it to the order's payment record.
     *
     * @param orderId - The order UUID
     * @param data - File and payment method
     * @returns The uploaded proof file metadata
     */
    attachPaymentProof(
        orderId: string,
        data: IAttachPaymentProofData
    ): Promise<Result<{ id: string; fileName: string; storageUrl: string }>>;

    /**
     * Verifies an order payment, transitioning the order to Paid status.
     *
     * @param orderId - The order UUID
     * @param data - Receipt URL to record
     * @returns Success indicator
     */
    verifyPayment(
        orderId: string,
        data: IVerifyPaymentCredentials
    ): Promise<Result<ICommerceActionResponse>>;

    /**
     * Rejects an order payment with optional notes.
     *
     * @param orderId - The order UUID
     * @param data - Optional rejection notes
     * @returns Success indicator
     */
    rejectPayment(
        orderId: string,
        data: IRejectPaymentCredentials
    ): Promise<Result<ICommerceActionResponse>>;

    /**
     * Fetches a paginated list of orders with optional status and customer filters.
     *
     * @param params - Pagination and filter parameters
     * @returns Paginated list of order summaries
     */
    listOrders(params: IOrdersQueryParams): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;

    /**
     * Fetches the full detail of a single order including items and payment.
     *
     * @param id - The order UUID
     * @returns The order detail entity
     */
    getOrderById(id: string): Promise<Result<IOrderDetailEntity>>;

    /**
     * Fetches the payment record for a specific order.
     *
     * @param orderId - The order UUID
     * @returns The payment entity
     */
    getOrderPayment(orderId: string): Promise<Result<IPaymentEntity>>;

    /**
     * Fetches a paginated list of orders awaiting payment.
     *
     * @param params - Pagination parameters
     * @returns Paginated list of pending-payment order summaries
     */
    listPendingPaymentOrders(
        params: IPaginationQueryParams
    ): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;

    /**
     * Fetches a paginated list of orders for a specific customer.
     *
     * @param customerId - The customer UUID
     * @param params - Pagination parameters
     * @returns Paginated list of order summaries for the customer
     */
    getCustomerOrders(
        customerId: string,
        params: IPaginationQueryParams
    ): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;

    /**
     * Fetches a paginated list of payment records with optional filters.
     *
     * @param params - Pagination, payment status, payment method, and search filters
     * @returns Paginated list of payment summaries with order and customer info
     */
    listPayments(
        params: IPaymentsQueryParams
    ): Promise<Result<IPaginatedResult<IPaymentSummaryEntity>>>;

    /**
     * Edits a draft order's customer or package assignment.
     *
     * @param id - The order UUID
     * @param data - Fields to update (customer and/or package)
     * @returns The updated order summary
     */
    editOrder(id: string, data: IEditOrderCredentials): Promise<Result<IOrderSummaryEntity>>;

    /**
     * Removes a content item from a draft order.
     *
     * @param orderId - The order UUID
     * @param itemId - The order item UUID to remove
     * @returns Success indicator
     */
    removeItem(orderId: string, itemId: string): Promise<Result<ICommerceActionResponse>>;

    /**
     * Removes a pricing tier snapshot from an order item.
     *
     * @param orderId - The order UUID
     * @param itemId - The order item UUID
     * @param tierId - The tier UUID to remove
     * @returns Success indicator
     */
    removeItemTier(
        orderId: string,
        itemId: string,
        tierId: string
    ): Promise<Result<ICommerceActionResponse>>;

    /**
     * Edits a content item within a draft order.
     *
     * @param orderId - The order UUID
     * @param itemId - The order item UUID to edit
     * @param data - Fields to update on the item
     * @returns The updated order item
     */
    editItem(
        orderId: string,
        itemId: string,
        data: IEditItemCredentials
    ): Promise<Result<IOrderItemEntity>>;
}
