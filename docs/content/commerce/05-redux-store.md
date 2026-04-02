# Phase 5: Redux Store

Single `commerce` slice with 13 action thunks covering all endpoints.

**Path:** `src/modules/commerce/presentation/store/`

---

## Constants

**File:** `constants.ts`

```ts
export const ActionType = {
    // Order mutations
    CreateOrder: "commerce/createOrder",
    AddItemToOrder: "commerce/addItemToOrder",
    AddTierToItem: "commerce/addTierToItem",
    SubmitOrder: "commerce/submitOrder",
    CancelOrder: "commerce/cancelOrder",

    // Payment mutations
    AttachPaymentProof: "commerce/attachPaymentProof",
    VerifyPayment: "commerce/verifyPayment",
    RejectPayment: "commerce/rejectPayment",

    // Order queries
    ListOrders: "commerce/listOrders",
    GetOrderById: "commerce/getOrderById",
    GetOrderPayment: "commerce/getOrderPayment",
    ListPendingPaymentOrders: "commerce/listPendingPaymentOrders",
    GetCustomerOrders: "commerce/getCustomerOrders",
} as const;

export const SliceName = { Commerce: "commerce" } as const;
```

> **Critical:** The suffix after `"commerce/"` must exactly match the state key. `ActionWrapperPending/Fulfilled/Rejected` extracts it via `action.type.split("/")[1]`.

---

## State Type

**File:** `type.ts`

```ts
type ICommerceState = {
    // Order mutations
    createOrder: IBasicInitialState<IOrderDetailEntity>;
    addItemToOrder: IBasicInitialState<IOrderItemEntity>;
    addTierToItem: IBasicInitialState<IItemTierEntity>;
    submitOrder: IBasicInitialState<IOrderDetailEntity>;
    cancelOrder: IBasicInitialState<IOrderDetailEntity>;

    // Payment mutations
    attachPaymentProof: IBasicInitialState<IPaymentEntity>;
    verifyPayment: IBasicInitialState<IPaymentEntity>;
    rejectPayment: IBasicInitialState<IPaymentEntity>;

    // Order queries
    listOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
    getOrderById: IBasicInitialState<IOrderDetailEntity>;
    getOrderPayment: IBasicInitialState<IPaymentEntity>;
    listPendingPaymentOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
    getCustomerOrders: IBasicInitialState<IPaginatedResult<IOrderSummaryEntity>>;
};

type CommerceStateKey = keyof ICommerceState;
```

---

## Initial State

**File:** `state.ts`

Uses `createInitialState<T>()` for each of the 13 state keys.

---

## Slice

**File:** `index.ts`

Uses `createSlice` with `clear` + `purge` reducers and `addCase` for all 13 actions × 3 lifecycle events (pending/fulfilled/rejected) = 39 `addCase` entries.

---

## Action Files (13 files)

One `createAsyncThunk` per endpoint:

| File | Thunk Arg | Return Type |
| --- | --- | --- |
| `createorder.action.ts` | `ICreateOrderCredentials` | `IOrderDetailEntity` |
| `additemtoorder.action.ts` | `{ orderId: string; data: IAddOrderItemCredentials }` | `IOrderItemEntity` |
| `addtiertoitem.action.ts` | `{ orderId: string; itemId: string; data: IAddItemTierCredentials }` | `IItemTierEntity` |
| `submitorder.action.ts` | `string` (orderId) | `IOrderDetailEntity` |
| `cancelorder.action.ts` | `string` (orderId) | `IOrderDetailEntity` |
| `attachpaymentproof.action.ts` | `{ orderId: string; data: IAttachPaymentProofCredentials }` | `IPaymentEntity` |
| `verifypayment.action.ts` | `string` (orderId) | `IPaymentEntity` |
| `rejectpayment.action.ts` | `string` (orderId) | `IPaymentEntity` |
| `listorders.action.ts` | `IListOrdersParams` | `IPaginatedResult<IOrderSummaryEntity>` |
| `getorderbyid.action.ts` | `string` (orderId) | `IOrderDetailEntity` |
| `getorderpayment.action.ts` | `string` (orderId) | `IPaymentEntity` |
| `listpendingpaymentorders.action.ts` | `IListOrdersParams` | `IPaginatedResult<IOrderSummaryEntity>` |
| `getcustomerorders.action.ts` | `{ customerId: string; params: IListOrdersParams }` | `IPaginatedResult<IOrderSummaryEntity>` |

---

## Integration

- [ ] Add `commerce: commerceReducer` to `root.reducer.ts`
- [ ] Extend `Cradle` interface in `service.locator.ts`
- [ ] Call `registerCommerceDependencies(container)` in `service.locator.ts`

---

## TODO

- [ ] Create `constants.ts`
- [ ] Create `type.ts`
- [ ] Create `state.ts`
- [ ] Create all 13 action files
- [ ] Create `index.ts` (slice)
- [ ] Wire into `root.reducer.ts`
- [ ] Wire into `service.locator.ts`
