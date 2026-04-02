# Phase 7: Hooks and Components

Custom hooks and UI components for the commerce module.

---

## Hooks

**Path:** `src/modules/commerce/presentation/hooks/`

---

### `UseOrdersList.ts`

- Dispatches `listOrdersAction({ page, limit, status })` on mount and when `statusFilter` changes
- Manages `statusFilter` state (`EnumOrderStatus | "all"`) — passed as a query param (server-side filtering)
- Manages `page` and `limit` pagination state
- Exposes: `items`, `pagination`, `loading`, `error`, `statusFilter`, `onStatusFilterChange`, `onPageChange`, `reload`

### `UseOrderDetail.ts`

- Accepts `orderId: string`
- Dispatches `getOrderByIdAction(orderId)` on mount
- Dispatches `getOrderPaymentAction(orderId)` on mount (to pre-load payment section)
- Exposes: `order`, `payment`, `loadingOrder`, `loadingPayment`, `error`, `reload`

### `UseCreateOrder.ts`

- `useForm<ICreateOrderCredentials>()`
- Customer select field — fetches customer list from Catalog module store (read-only dependency)
- `onSubmit` → dispatch `createOrderAction` → navigate to `/orders/:id` on success
- Exposes: `form`, `loading`, `error`, `onSubmit`

### `UseOrderActions.ts`

- Selects `submitOrder`, `cancelOrder` from store
- `onSubmit(orderId)` → dispatch → `showNotification(submitSuccess)` → `reload()`
- `onCancel(orderId)` → dispatch → `showNotification(cancelSuccess)` → `reload()`
- `onAddItem(orderId, data)` → dispatch `addItemToOrderAction` → `showNotification(addItemSuccess)` → `reload()`
- `onAddTier(orderId, itemId, data)` → dispatch `addTierToItemAction` → `showNotification(addTierSuccess)` → `reload()`
- Exposes: `loadingSubmit`, `loadingCancel`, `loadingAddItem`, `loadingAddTier`, `error`, `onSubmit`, `onCancel`, `onAddItem`, `onAddTier`

### `UsePaymentActions.ts`

- `onAttachProof(orderId, data)` → dispatch `attachPaymentProofAction` → `showNotification(attachProofSuccess)` → `reload()`
- `onVerify(orderId)` → dispatch `verifyPaymentAction` → `showNotification(verifySuccess)` → `reload()`
- `onReject(orderId)` → dispatch `rejectPaymentAction` → `showNotification(rejectSuccess)` → `reload()`
- Exposes: `loadingAttach`, `loadingVerify`, `loadingReject`, `error`, `onAttachProof`, `onVerify`, `onReject`

---

## Components

**Path:** `src/modules/commerce/presentation/components/`

---

## Forms

### `forms/OrderForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `customerId` | Client | `Select` (customer list) | required |

- The customer `Select` loads options from the Catalog module store
- Renders in a `CreateEditModal` — used only for order creation (no edit after creation)

### `forms/OrderItemForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `contentKind` | Type de contenu | `Select` (EnumCoreContentType) | required |
| `categoryId` | Catégorie | `Select` (category list) | required |
| `promotionLevelId` | Niveau de promotion | `Select` (promotion level list) | required |
| `socialBoost` | Boost social | `Checkbox` | — |
| `isBonus` | Bonus | `Checkbox` | — |

### `forms/OrderTierForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `pricingTierId` | Tranche tarifaire | `Select` (pricing tier list) | required |

### `forms/PaymentProofForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `paymentMethod` | Mode de paiement | `Select` (EnumPaymentMethod) | required |
| `amountUsd` | Montant (USD) | `InputNumber` | required, min 0 |
| `file` | Preuve de paiement | `Upload` (single file) | required |

---

## Tables

### `tables/OrdersTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Client | `customerName` | Yes | `<Text strong>` |
| Statut | `status` | Yes | `<OrderStatusTag>` |
| Montant | `totalAmountUsd` | Yes | `${n.toFixed(2)} USD` |
| Articles | `itemCount` | Yes | `{n} article(s)` |
| Créé le | `createdAt` | Yes | `dayjs().format()` |
| Actions | — | No | `<TableActionDropdown>` |

Action type: `"view"` — navigates to `/orders/:id`

### `tables/OrderItemsTable/columns.tsx`

Used inside `OrderDetailView` to display the items of a single order.

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Type | `contentKind` | No | `<ContentKindTag>` |
| Catégorie | `categoryName` | No | `<Text>` |
| Promotion | `promotionLevelName` | No | `<Text>` |
| Prix promo | `promoPriceUsd` | No | `${n.toFixed(2)} USD` |
| Boost social | `socialBoost` | No | `<BooleanTag>` |
| Bonus | `isBonus` | No | `<BooleanTag>` |
| Tranches | `tiers` | No | count badge + expand row |

---

## Detail Views

### `ui/OrderDetailView/index.tsx`

Main layout for the order detail page:

```
OrderDetailHeader (customerName, status badge, totalAmountUsd, action buttons)
OrderItemsTable (items with tiers in expandable rows)
PaymentSection
```

- Action buttons in the header depend on `status`:
  - Draft: "Soumettre" + "Annuler" + "Ajouter un article"
  - PendingPayment: "Annuler" + "Attacher une preuve"
  - Paid / Cancelled: read-only

### `ui/PaymentSection/index.tsx`

Displays the payment record for an order.

```
PaymentStatusBadge (Pending / Verified / Rejected)
PaymentDetailsCard (amountUsd, paymentMethod, verifiedBy, verifiedAt, receiptUrl)
PaymentProofPreview (link or thumbnail of paymentProof file)
VerifyRejectActions (only if status = Pending)
```

- `VerifyRejectActions` shows "Vérifier" (primary) and "Rejeter" (danger) buttons
- Both trigger a confirmation modal before dispatching

---

## TODO

- [ ] Create `UseOrdersList.ts` with JSDoc
- [ ] Create `UseOrderDetail.ts` with JSDoc
- [ ] Create `UseCreateOrder.ts` with JSDoc
- [ ] Create `UseOrderActions.ts` with JSDoc
- [ ] Create `UsePaymentActions.ts` with JSDoc
- [ ] Create `OrderForm` component with JSDoc
- [ ] Create `OrderItemForm` component with JSDoc
- [ ] Create `OrderTierForm` component with JSDoc
- [ ] Create `PaymentProofForm` component with JSDoc
- [ ] Create `OrdersTable/columns.tsx` with JSDoc
- [ ] Create `OrderItemsTable/columns.tsx` with JSDoc
- [ ] Create `OrderDetailView` component with JSDoc
- [ ] Create `PaymentSection` component with JSDoc
