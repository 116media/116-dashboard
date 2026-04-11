import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { ICommerceState } from "./type";

/**
 * Initial state for the commerce Redux slice.
 *
 * @description
 * Defines initial state for all commerce-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const commerceInitialState: ICommerceState = {
    createOrder: createInitialState(),
    addItemToOrder: createInitialState(),
    addTierToItem: createInitialState(),
    submitOrder: createInitialState(),
    cancelOrder: createInitialState(),
    attachPaymentProof: createInitialState(),
    verifyPayment: createInitialState(),
    rejectPayment: createInitialState(),
    listOrders: createInitialState(),
    getOrderById: createInitialState(),
    getOrderPayment: createInitialState(),
    listPendingPaymentOrders: createInitialState(),
    getCustomerOrders: createInitialState()
};
