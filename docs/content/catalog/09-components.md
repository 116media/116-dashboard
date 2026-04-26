# Phase 9: Components

Forms, table columns, action modals, and nested management panels.

**Path:** `src/modules/catalog/presentation/components/`

---

## Forms

### `forms/CategoryForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `contentTypeId` | Type de contenu | `Select` (populated from lookup store) | required |
| `name` | Nom | `Input` | required, max 100 |
| `description` | Description | `TextArea` | optional, max 500 |
| `isFree` | Gratuit | `Checkbox` | required |

> When `isFree` is checked, the pricing section (if shown in a detail view) is hidden. The `contentTypeId` select loads content types from the lookup module store.

### `forms/CategoryPricingForm/index.tsx`

Used inside the pricing management panel (add pricing row):

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `pricingTierId` | Niveau tarifaire | `Select` (populated from lookup store) | required |
| `priceUsd` | Prix (USD) | `InputNumber` | required, min 0 |

### `forms/CustomerForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `fullName` | Nom complet | `Input` | required, max 100 |
| `email` | Email | `Input` | required, email format |
| `phone` | Téléphone | `Input` | optional, max 30 |
| `company` | Entreprise | `Input` | optional, max 100 |
| `notes` | Notes | `TextArea` | optional, max 500 |

### `forms/PackageForm/index.tsx`

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `name` | Nom | `Input` | required, max 100 |
| `description` | Description | `TextArea` | optional, max 500 |
| `flatPriceUsd` | Prix forfaitaire (USD) | `InputNumber` | required, min 0 |

### `forms/PackageSlotForm/index.tsx`

Used inside the slot management panel (add slot row):

| Field | Label | Component | Validation |
| --- | --- | --- | --- |
| `categoryId` | Catégorie | `Select` (populated from catalog categories) | required |
| `isRequired` | Obligatoire | `Checkbox` | required |
| `quantity` | Quantité | `InputNumber` | required, min 1 |

### Form Props (shared pattern)

```ts
interface IXxxFormProps {
    form: FormInstance;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: IXxxEntity | null;
}
```

---

## Table Columns

### `tables/CategoriesTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Nom | `name` | Yes | `<Text strong>` |
| Type de contenu | `contentTypeName` | Yes | `<Text>` |
| Gratuit | `isFree` | Yes | `<BooleanTag>` or checkmark |
| Statut | `isActive` | Yes | `<StatusTag>` |
| Actions | — | No | `<TableActionDropdown>` |

Action type: `"edit" | "activate" | "deactivate" | "managePricing"`

### `tables/CustomersTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Nom complet | `fullName` | Yes | `<Text strong>` |
| Email | `email` | Yes | `<Text>` |
| Téléphone | `phone` | Yes | `<Text type="secondary">` |
| Entreprise | `company` | Yes | `<Text type="secondary">` |
| Actions | — | No | `<TableActionDropdown>` |

Action type: `"edit"`

### `tables/PackagesTable/columns.tsx`

| Column | DataIndex | Sortable | Render |
| --- | --- | --- | --- |
| Nom | `name` | Yes | `<Text strong>` |
| Prix forfaitaire | `flatPriceUsd` | Yes | `${n.toFixed(2)} USD` |
| Créneaux | `slots` | No | `{n} créneau(x)` (slots count) |
| Statut | `isActive` | Yes | `<StatusTag>` |
| Actions | — | No | `<TableActionDropdown>` |

Action type: `"activate" | "deactivate" | "manageSlots"`

---

## Action Modals

### `ui/CategoryActionModal/index.tsx`

Uses shared `ActionModal`. Imports config from `catalog.categories.config.ts`.
Guard: `if (!config || !entity) return null;`

### `ui/PackageActionModal/index.tsx`

Same pattern. Imports config from `catalog.packages.config.ts`.

> No `CustomerActionModal` — customers have no status-change actions.

---

## Management Panels

### `ui/CategoryPricingPanel/index.tsx`

Rendered inside a `Drawer` or `Modal` opened via the `managePricing` dropdown action:

- Lists current `pricing[]` rows with edit (inline price update) and delete (remove pricing) per row
- Includes `CategoryPricingForm` at the bottom to add a new pricing tier
- Uses `UseManageCategoryPricing` and `UseAddCategoryPricing` hooks

### `ui/PackageSlotsPanel/index.tsx`

Rendered inside a `Drawer` or `Modal` opened via the `manageSlots` dropdown action:

- Lists current `slots[]` rows with delete (remove slot) per row
- Includes `PackageSlotForm` at the bottom to add a new slot
- Uses `UseManagePackageSlots` and `UseAddPackageSlot` hooks

---

## TODO

- [ ] Create 5 form components with JSDoc
- [ ] Create 3 table column files with JSDoc
- [ ] Create 2 action modal components with JSDoc
- [ ] Create 2 management panel components with JSDoc
