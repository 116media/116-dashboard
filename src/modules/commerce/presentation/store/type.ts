import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the commerce module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type ICommerceState = {
    createOrder: IBasicInitialState<IOrderSummaryEntity>;
    addItemToOrder: IBasicInitialState<IOrderItemEntity>;
    addTierToItem: IBasicInitialState<IItemTierEntity>;
    submitOrder: IBasicInitialState<{ isSuccess: boolean }>;
    cancelOrder: IBasicInitialState<{ isSuccess: boolean }>;
    attachPaymentProof: IBasicInitialState<{ id: string; fileName: string; storageUrl: string }>;
    verifyPayment: IBasicInitialState<{ isSuccess: boolean }>;
    rejectPayment: IBasicInitialState<{ isSuccess: boolean }>;
    listOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
    getOrderById: IBasicInitialState<IOrderDetailEntity>;
    getOrderPayment: IBasicInitialState<IPaymentEntity>;
    listPendingPaymentOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
    getCustomerOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
};

export type CommerceStateKey = keyof ICommerceState;
