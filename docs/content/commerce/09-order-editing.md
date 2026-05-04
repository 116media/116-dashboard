# Order Editing Operations

> All editing operations are restricted to **Draft** orders only.
> Attempting to edit a submitted, paid, or cancelled order returns `400 Bad Request`.

## 1. Edit Order

**Endpoint:** `PATCH /api/v1/admin/orders/{id}`

Updates the customer or package linked to a draft order.

### Request

```json
{
  "customerId": "uuid (optional)",
  "packageId": "uuid | null (optional)"
}
```

### Response — `200 OK`

```json
{
  "order": { "...ContentOrderSummaryDto" }
}
```

### Errors

- `400` — Order is not in Draft status
- `404` — Order, customer, or package not found

---

## 2. Remove Item

**Endpoint:** `DELETE /api/v1/admin/orders/{id}/items/{itemId}`

Removes a content item and all its attached pricing tiers from a draft order.
Recalculates the order total after removal.

### Response — `200 OK`

```json
{
  "isSuccess": true
}
```

### Errors

- `400` — Order is not in Draft status
- `404` — Order or item not found

---

## 3. Remove Tier

**Endpoint:** `DELETE /api/v1/admin/orders/{id}/items/{itemId}/tiers/{tierId}`

Removes a pricing tier snapshot from an order item in a draft order.
Recalculates the order total after removal.

### Response — `200 OK`

```json
{
  "isSuccess": true
}
```

### Errors

- `400` — Order is not in Draft status
- `404` — Order, item, or tier not found

---

## 4. Edit Item

**Endpoint:** `PATCH /api/v1/admin/orders/{id}/items/{itemId}`

Updates properties of a content item in a draft order.
If the promotion level changes, the promotion price snapshot is re-calculated.

### Request

```json
{
  "contentKind": "Article | Video | Short (optional)",
  "categoryId": "uuid (optional)",
  "promotionLevelId": "uuid | null (optional)",
  "socialBoost": "boolean (optional)",
  "isBonus": "boolean (optional)"
}
```

### Response — `200 OK`

```json
{
  "item": { "...OrderItemDto" }
}
```

### Errors

- `400` — Order is not in Draft status, or validation fails
- `404` — Order, item, category, or promotion level not found

---

## Business Rules

- All 4 operations guard with `EnsureDraft()` — only Draft orders can be modified
- Removing an item cascades to remove all its tiers
- Removing a tier or item recalculates `order.TotalAmountUsd`
- Editing an item with a new `promotionLevelId` re-snapshots the promotion price
- Editing an item with a new `categoryId` validates that the category is active and commissionable
