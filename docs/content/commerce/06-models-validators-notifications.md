# Phase 6: Models, Validators, Notifications

Form credential interfaces, validation rules, and success notification configs.

---

## Models

**Path:** `src/modules/commerce/presentation/model/`

| File | Fields |
| --- | --- |
| `ICreateOrderCredentials.ts` | `customerId: string` |
| `IAddOrderItemCredentials.ts` | `contentKind: EnumCoreContentType; categoryId: string; promotionLevelId: string; socialBoost: boolean; isBonus: boolean` |
| `IAddItemTierCredentials.ts` | `pricingTierId: string` |
| `IAttachPaymentProofCredentials.ts` | `file: File; paymentMethod: EnumPaymentMethod; amountUsd: number` |
| `IListOrdersParams.ts` | `page?: number; limit?: number; status?: EnumOrderStatus` |

> `IAttachPaymentProofCredentials` uses `FormData` when sent to the API — the model holds the raw form values before serialisation.

---

## Validators

**Path:** `src/modules/commerce/presentation/utils/validators/`

### `commerce.order.validator.ts`

```ts
export const OrderValidator = {
    customerId: (label: string) => [required(label)],
};
```

### `commerce.order-item.validator.ts`

```ts
export const OrderItemValidator = {
    contentKind: (label: string) => [required(label)],
    categoryId: (label: string) => [required(label)],
    promotionLevelId: (label: string) => [required(label)],
};
```

> `socialBoost` and `isBonus` are boolean toggles (checkboxes) — no validation rules needed.

### `commerce.order-tier.validator.ts`

```ts
export const OrderTierValidator = {
    pricingTierId: (label: string) => [required(label)],
};
```

### `commerce.payment.validator.ts`

```ts
export const PaymentValidator = {
    paymentMethod: (label: string) => [required(label)],
    amountUsd: (label: string) => [required(label), min(label, 0)],
    file: (label: string) => [required(label)],
};
```

---

## Notifications

**Path:** `src/modules/commerce/presentation/utils/notification/`

Each file exports a config object with the relevant success keys for that operation.

### `commerce.order.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Commande créée" | "La commande a été créée avec succès." |
| `addItemSuccess` | "Article ajouté" | "L'article a été ajouté à la commande avec succès." |
| `addTierSuccess` | "Tranche ajoutée" | "La tranche tarifaire a été ajoutée à l'article avec succès." |
| `submitSuccess` | "Commande soumise" | "La commande a été soumise et est paiement en cours." |
| `cancelSuccess` | "Commande annulée" | "La commande a été annulée avec succès." |

### `commerce.payment.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `attachProofSuccess` | "Preuve attachée" | "La preuve de paiement a été attachée avec succès." |
| `verifySuccess` | "Paiement vérifié" | "Le paiement a été vérifié et validé avec succès." |
| `rejectSuccess` | "Paiement rejeté" | "Le paiement a été rejeté avec succès." |

---

## TODO

- [ ] Create all 5 model files with JSDoc
- [ ] Create all 4 validator files with JSDoc
- [ ] Create `commerce.order.notification.ts` with JSDoc
- [ ] Create `commerce.payment.notification.ts` with JSDoc
