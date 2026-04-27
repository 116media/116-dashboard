# Phase 6: Models, Validators, Notifications

Form credential interfaces, validation rules, and success notification configs.

---

## Models

**Path:** `src/modules/lookup/presentation/model/`

| File | Fields |
| --- | --- |
| `ICreateContentTypeCredentials.ts` | `name: string` |
| `IUpdateContentTypeCredentials.ts` | `name: string` |
| `ICreatePricingTierCredentials.ts` | `name: string; description?: string` |
| `IUpdatePricingTierCredentials.ts` | `name: string; description?: string` |
| `ICreatePromotionLevelCredentials.ts` | `name: string; durationDays: number; priceUsd: number` |
| `IUpdatePromotionLevelCredentials.ts` | `name: string; durationDays: number; priceUsd: number` |
| `ICreateTagCredentials.ts` | `name: string` |

---

## Validators

**Path:** `src/modules/lookup/presentation/utils/validators/`

### `lookup.content-types.validator.ts`

```ts
export const ContentTypesValidator = {
    name: (label: string) => [required(label), max(label, 50)],
};
```

### `lookup.pricing-tiers.validator.ts`

```ts
export const PricingTiersValidator = {
    name: (label: string) => [required(label), max(label, 50)],
    description: (label: string) => [max(label, 300)],
};
```

### `lookup.promotion-levels.validator.ts`

```ts
export const PromotionLevelsValidator = {
    name: (label: string) => [required(label), max(label, 50)],
    durationDays: (label: string) => [required(label), min(label, 1)],
    priceUsd: (label: string) => [required(label), min(label, 0)],
};
```

### `lookup.tags.validator.ts`

```ts
export const TagsValidator = {
    name: (label: string) => [required(label), max(label, 50)],
};
```

> Slug is auto-generated from the name on the backend — no slug field in the form.

---

## Notifications

**Path:** `src/modules/lookup/presentation/utils/notification/`

Each file exports a config object with `createSuccess`, `updateSuccess`, `activateSuccess`, `deactivateSuccess` (where applicable).

### `lookup.content-types.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Type créé" | "Le type de contenu a été créé avec succès." |
| `updateSuccess` | "Type modifié" | "Le type de contenu a été modifié avec succès." |
| `activateSuccess` | "Type activé" | "Le type de contenu a été activé avec succès." |
| `deactivateSuccess` | "Type désactivé" | "Le type de contenu a été désactivé avec succès." |

### `lookup.pricing-tiers.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Niveau créé" | "Le niveau tarifaire a été créé avec succès." |
| `updateSuccess` | "Niveau modifié" | "Le niveau tarifaire a été modifié avec succès." |
| `activateSuccess` | "Niveau activé" | "Le niveau tarifaire a été activé avec succès." |
| `deactivateSuccess` | "Niveau désactivé" | "Le niveau tarifaire a été désactivé avec succès." |

### `lookup.promotion-levels.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Promotion créée" | "Le niveau de promotion a été créé avec succès." |
| `updateSuccess` | "Promotion modifiée" | "Le niveau de promotion a été modifié avec succès." |
| `activateSuccess` | "Promotion activée" | "Le niveau de promotion a été activé avec succès." |
| `deactivateSuccess` | "Promotion désactivée" | "Le niveau de promotion a été désactivé avec succès." |

### `lookup.tags.notification.ts`

| Key | Title | Description |
| --- | --- | --- |
| `createSuccess` | "Tag créé" | "Le tag a été créé avec succès." |

---

## TODO

- [x] Create all 7 model files with JSDoc
- [x] Create all 4 validator files with JSDoc
- [x] Create all 4 notification files with JSDoc
- [x] Create `IUpdateTagCredentials.ts` (added post-spec)
- [x] Add `updateSuccess` and `deleteSuccess` to tags notification (added post-spec)
