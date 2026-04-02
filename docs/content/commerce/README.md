# Commerce Module — Documentation

> **UI Label:** This module is displayed as **"Ventes"** in the dashboard navigation.

B2B revenue lifecycle: **orders** and **payments**.

> **Status:** Planned — depends on Catalogue module (customers, categories, packages) being implemented first.

## Overview

The Ventes module manages the order-to-payment lifecycle for B2B content commissions:

1. Create order for a customer
2. Add content items (articles/videos) with category and pricing tiers
3. Submit order (Draft → PendingPayment)
4. Attach payment proof
5. Verify or reject payment
6. On verification: stamps (SocialBoost, IsFeatured) applied to linked content

## Backend Endpoints (13)

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/admin/orders` | AdminOrSuperAdmin | Create order |
| POST | `/api/v1/admin/orders/{id}/items` | AdminOrSuperAdmin | Add item to order |
| POST | `/api/v1/admin/orders/{id}/items/{itemId}/tiers` | AdminOrSuperAdmin | Add tier to item |
| PATCH | `/api/v1/admin/orders/{id}/submit` | AdminOrSuperAdmin | Submit order |
| PATCH | `/api/v1/admin/orders/{id}/cancel` | AdminOrSuperAdmin | Cancel order |
| POST | `/api/v1/admin/orders/{id}/payment/proof` | AdminOrSuperAdmin | Attach payment proof |
| PATCH | `/api/v1/admin/orders/{id}/payment/verify` | AdminOrSuperAdmin | Verify payment |
| PATCH | `/api/v1/admin/orders/{id}/payment/reject` | AdminOrSuperAdmin | Reject payment |
| GET | `/api/v1/admin/orders` | AdminOrSuperAdmin | List all orders |
| GET | `/api/v1/admin/orders/{id}` | AdminOrSuperAdmin | Get order by ID |
| GET | `/api/v1/admin/orders/{id}/payment` | AdminOrSuperAdmin | Get payment record |
| GET | `/api/v1/admin/orders/pending-payment` | AdminOrSuperAdmin | List pending payment orders |
| GET | `/api/v1/admin/customers/{customerId}/orders` | AdminOrSuperAdmin | Get customer orders |

## Order Status Workflow

```
Draft → PendingPayment → Paid
  ↘ Cancelled      ↗
```

## Key Enums

- **EnumOrderStatus** — Draft, PendingPayment, Paid, Cancelled
- **EnumPaymentMethod** — BankTransfer, MobileMoney, Cash
- **EnumPaymentStatus** — Pending, Verified, Rejected

## Key Entities

- **ContentOrderEntity** — customerId, packageId, totalAmountUsd, status
- **ContentOrderItemEntity** — orderId, contentKind, categoryId, promotionLevelId, socialBoost, isBonus
- **ContentItemTierEntity** — orderItemId, pricingTierId, priceSnapshotUsd
- **ContentPaymentEntity** — orderId, amountUsd, paymentMethod, status, paymentProofFileId

## Module Path

`src/modules/commerce/`

## Dependencies

- Catalogue module (customers, categories, packages)
- Références module (pricing tiers, promotion levels)
