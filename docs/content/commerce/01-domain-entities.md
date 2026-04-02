# Phase 1: Domain Entities

Entity interfaces for the commerce module (orders and payments).

**Module path:** `src/modules/commerce/domain/entities/`

---

## Enums

**File:** `src/modules/commerce/domain/enums/`

### `EnumOrderStatus.ts`

```ts
enum EnumOrderStatus {
    Draft = "Draft",
    PendingPayment = "PendingPayment",
    Paid = "Paid",
    Cancelled = "Cancelled",
}
```

### `EnumPaymentMethod.ts`

```ts
enum EnumPaymentMethod {
    BankTransfer = "BankTransfer",
    MobileMoney = "MobileMoney",
    Cash = "Cash",
}
```

### `EnumPaymentStatus.ts`

```ts
enum EnumPaymentStatus {
    Pending = "Pending",
    Verified = "Verified",
    Rejected = "Rejected",
}
```

### `EnumCoreContentType.ts`

```ts
enum EnumCoreContentType {
    Article = "Article",
    Video = "Video",
    Short = "Short",
}
```

> These enums are shared across the commerce module. They map directly from the backend-generated enum values.

---

## `IItemTierEntity.ts`

```ts
interface IItemTierEntity {
    tierName: string;
    priceSnapshotUsd: number;
}
```

Maps from backend `ItemTierDto`. Represents a pricing tier snapshot at the time the item was added to the order.

---

## `IOrderItemEntity.ts`

```ts
interface IOrderItemEntity {
    id: string;
    contentKind: EnumCoreContentType;
    categoryName: string;
    promotionLevelName: string;
    promoPriceUsd: number;
    socialBoost: boolean;
    isBonus: boolean;
    tiers: IItemTierEntity[];
}
```

Maps from backend `OrderItemDto`. Represents a single content item within an order.

---

## `IPaymentEntity.ts`

```ts
interface IPaymentEntity {
    id: string;
    amountUsd: number;
    paymentMethod: EnumPaymentMethod | null;
    paymentProof: IFileEntity | null;
    status: EnumPaymentStatus;
    verifiedBy: string | null;
    verifiedAt: string | null;
    receiptUrl: string | null;
}
```

Maps from backend `PaymentDto`. The `paymentMethod` and `paymentProof` are optional until the payment proof is attached. `IFileEntity` maps from the backend `FileDto`.

---

## `IOrderSummaryEntity.ts`

```ts
interface IOrderSummaryEntity {
    id: string;
    customerName: string;
    status: EnumOrderStatus;
    totalAmountUsd: number;
    itemCount: number;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ContentOrderSummaryDto`. Used in list views (orders list, pending-payment list, customer orders).

---

## `IOrderDetailEntity.ts`

```ts
interface IOrderDetailEntity {
    id: string;
    customerName: string;
    status: EnumOrderStatus;
    totalAmountUsd: number;
    items: IOrderItemEntity[];
    payment: IPaymentEntity | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    createdBy?: string | null;
    updatedBy?: string | null;
}
```

Maps from backend `ContentOrderDetailDto`. Used in the order detail view. Includes the full item list and optional payment record.

---

## TODO

- [ ] Create `EnumOrderStatus.ts`
- [ ] Create `EnumPaymentMethod.ts`
- [ ] Create `EnumPaymentStatus.ts`
- [ ] Create `EnumCoreContentType.ts`
- [ ] Create `IItemTierEntity.ts` with JSDoc
- [ ] Create `IOrderItemEntity.ts` with JSDoc
- [ ] Create `IPaymentEntity.ts` with JSDoc
- [ ] Create `IOrderSummaryEntity.ts` with JSDoc
- [ ] Create `IOrderDetailEntity.ts` with JSDoc
