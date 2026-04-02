# Phase 2: Repository Port

Single repository port for all 13 commerce endpoints.

**File:** `src/modules/commerce/application/repositories/commerce.repository.port.ts`

---

## Interface

```ts
interface ICommerceRepositoryPort {
    // Order mutations (5 methods)
    createOrder(data: ICreateOrderCredentials): Promise<Result<IOrderDetailEntity>>;
    addItemToOrder(orderId: string, data: IAddOrderItemCredentials): Promise<Result<IOrderItemEntity>>;
    addTierToItem(orderId: string, itemId: string, data: IAddItemTierCredentials): Promise<Result<IItemTierEntity>>;
    submitOrder(orderId: string): Promise<Result<IOrderDetailEntity>>;
    cancelOrder(orderId: string): Promise<Result<IOrderDetailEntity>>;

    // Payment mutations (3 methods)
    attachPaymentProof(orderId: string, data: IAttachPaymentProofCredentials): Promise<Result<IPaymentEntity>>;
    verifyPayment(orderId: string): Promise<Result<IPaymentEntity>>;
    rejectPayment(orderId: string): Promise<Result<IPaymentEntity>>;

    // Order queries (5 methods)
    listOrders(params: IListOrdersParams): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;
    getOrderById(orderId: string): Promise<Result<IOrderDetailEntity>>;
    getOrderPayment(orderId: string): Promise<Result<IPaymentEntity>>;
    listPendingPaymentOrders(params: IListOrdersParams): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;
    getCustomerOrders(customerId: string, params: IListOrdersParams): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>;
}
```

---

## Design Decision

One shared port instead of separate ports because:
- All methods target the same domain (orders and payments)
- They share the same repository implementation class
- They belong to the same backend sub-module (`/api/v1/admin/orders`)
- It avoids splitting a tightly coupled flow across multiple files

---

## Query Parameters

```ts
interface IListOrdersParams {
    page?: number;
    limit?: number;
    status?: EnumOrderStatus;
}
```

The `status` filter is applied server-side via query params on the list endpoints. The `listPendingPaymentOrders` endpoint ignores `status` (it is pre-filtered by the backend).

---

## TODO

- [ ] Create `commerce.repository.port.ts` with JSDoc on the interface and every method
- [ ] Create `IListOrdersParams` model file
