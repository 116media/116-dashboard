# Phase 4: Infrastructure

Mapper, repository implementation, and DI registration.

**Path:** `src/modules/commerce/infrastructure/`

---

## Mapper

**File:** `mappers/commerce.mapper.ts`

```ts
export const CommerceMapper = {
    itemTierFromDto(dto: ItemTierDto): IItemTierEntity,
    orderItemFromDto(dto: OrderItemDto): IOrderItemEntity,
    paymentFromDto(dto: PaymentDto): IPaymentEntity,
    orderSummaryFromDto(dto: ContentOrderSummaryDto): IOrderSummaryEntity,
    orderDetailFromDto(dto: ContentOrderDetailDto): IOrderDetailEntity,
} as const;
```

Each method maps generated DTO fields to the domain entity interface. Key mapping notes:

- `orderDetailFromDto` calls `orderItemFromDto` for each item in `dto.items[]`
- `orderItemFromDto` calls `itemTierFromDto` for each tier in `dto.tiers[]`
- `paymentFromDto`: maps `dto.paymentProof` (FileDto) to `IFileEntity | null`
- Auditable fields (`createdAt`, `updatedAt`, `createdBy`, `updatedBy`) are mapped with `?? null` fallback

---

## Repository Implementation

**File:** `repositories/commerce.repository.impl.ts`

Implements `ICommerceRepositoryPort`. Each method follows the try/catch pattern:

```ts
async createOrder(data: ICreateOrderCredentials): Promise<Result<IOrderDetailEntity>> {
    try {
        const response = await apiClient.api.adminCreateOrder(data);
        return ok(CommerceMapper.orderDetailFromDto(response.data));
    } catch (error) {
        return err(ProblemMapper.toFailure(error));
    }
}
```

### API Method Mapping

| Repository Method | Generated API Method |
| --- | --- |
| `createOrder` | `apiClient.api.adminCreateOrder(data)` |
| `addItemToOrder` | `apiClient.api.adminAddItemToOrder(orderId, data)` |
| `addTierToItem` | `apiClient.api.adminAddTierToItem(orderId, itemId, data)` |
| `submitOrder` | `apiClient.api.adminSubmitOrder(orderId)` |
| `cancelOrder` | `apiClient.api.adminCancelOrder(orderId)` |
| `attachPaymentProof` | `apiClient.api.adminAttachPaymentProof(orderId, data)` |
| `verifyPayment` | `apiClient.api.adminVerifyPayment(orderId)` |
| `rejectPayment` | `apiClient.api.adminRejectPayment(orderId)` |
| `listOrders` | `apiClient.api.adminListOrders(params)` |
| `getOrderById` | `apiClient.api.adminGetOrderById(orderId)` |
| `getOrderPayment` | `apiClient.api.adminGetOrderPayment(orderId)` |
| `listPendingPaymentOrders` | `apiClient.api.adminListPendingPaymentOrders(params)` |
| `getCustomerOrders` | `apiClient.api.adminGetCustomerOrders(customerId, params)` |

> **Important:** Verify exact method names against the generated API client before implementing. Method names may differ (e.g., `adminCreateOrder` vs `createOrder`).

---

## DI Registration

**File:** `dependencies/commerce.dependencies.ts`

```ts
export function registerCommerceDependencies(container: AwilixContainer): void {
    container.register({
        commerceRepository: asClass(CommerceRepositoryImpl).singleton(),

        // Order mutations
        createOrderUseCase: asClass(CreateOrderUseCase).transient(),
        addItemToOrderUseCase: asClass(AddItemToOrderUseCase).transient(),
        addTierToItemUseCase: asClass(AddTierToItemUseCase).transient(),
        submitOrderUseCase: asClass(SubmitOrderUseCase).transient(),
        cancelOrderUseCase: asClass(CancelOrderUseCase).transient(),

        // Payment mutations
        attachPaymentProofUseCase: asClass(AttachPaymentProofUseCase).transient(),
        verifyPaymentUseCase: asClass(VerifyPaymentUseCase).transient(),
        rejectPaymentUseCase: asClass(RejectPaymentUseCase).transient(),

        // Order queries
        listOrdersUseCase: asClass(ListOrdersUseCase).transient(),
        getOrderByIdUseCase: asClass(GetOrderByIdUseCase).transient(),
        getOrderPaymentUseCase: asClass(GetOrderPaymentUseCase).transient(),
        listPendingPaymentOrdersUseCase: asClass(ListPendingPaymentOrdersUseCase).transient(),
        getCustomerOrdersUseCase: asClass(GetCustomerOrdersUseCase).transient(),
    });
}
```

Call `registerCommerceDependencies(container)` in `service.locator.ts` and extend the `Cradle` interface with all 14 entries (1 repository + 13 use cases).

---

## TODO

- [ ] Create `commerce.mapper.ts` with JSDoc
- [ ] Create `commerce.repository.impl.ts` with JSDoc
- [ ] Create `commerce.dependencies.ts` with JSDoc
- [ ] Verify all generated API method names against `116.api.ts`
- [ ] Extend `Cradle` interface in `service.locator.ts` with 14 entries
- [ ] Call `registerCommerceDependencies(container)` in `service.locator.ts`
