/**
 * Redux action type constants for the commerce module.
 */
export const ActionType = {
    CreateOrder: "Commerce/createOrder",
    AddItemToOrder: "Commerce/addItemToOrder",
    AddTierToItem: "Commerce/addTierToItem",
    SubmitOrder: "Commerce/submitOrder",
    CancelOrder: "Commerce/cancelOrder",
    AttachPaymentProof: "Commerce/attachPaymentProof",
    VerifyPayment: "Commerce/verifyPayment",
    RejectPayment: "Commerce/rejectPayment",
    ListOrders: "Commerce/listOrders",
    GetOrderById: "Commerce/getOrderById",
    GetOrderPayment: "Commerce/getOrderPayment",
    ListPendingPaymentOrders: "Commerce/listPendingPaymentOrders",
    GetCustomerOrders: "Commerce/getCustomerOrders",
    ListPayments: "Commerce/listPayments",
    EditOrder: "Commerce/editOrder",
    RemoveItem: "Commerce/removeItem",
    RemoveItemTier: "Commerce/removeItemTier",
    EditItem: "Commerce/editItem"
} as const;

/**
 * Redux slice name for the commerce module.
 */
export const SliceName = {
    Commerce: "commerce"
} as const;
