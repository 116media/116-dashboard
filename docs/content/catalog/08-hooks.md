# Phase 8: Hooks

Custom hooks following the paginated-list / actions / create / update pattern per resource.

**Path:** `src/modules/catalog/presentation/hooks/`

---

## Categories (6 hooks)

### `UseCategoriesList.ts`

- Dispatches `getCategoriesAction(params)` on mount and on page/pageSize change
- Manages `page`, `pageSize`, `statusFilter` state (`"all" | "active" | "inactive"`)
- Passes `isActive` query param to the server when filter is not `"all"`
- Exposes: `items`, `total`, `page`, `pageSize`, `loading`, `error`, `statusFilter`, `onPageChange`, `onStatusFilterChange`, `reload`

### `UseCategoryActions.ts`

- Selects `activateCategory` and `deactivateCategory` from store
- `onActivate(id)` → dispatch → `showNotification` → `reload()`
- `onDeactivate(id)` → dispatch → `showNotification` → `reload()`
- Exposes: `loading`, `error`, `onActivate`, `onDeactivate`

### `UseCreateCategory.ts`

- `useForm<ICreateCategoryCredentials>()`
- `success` state for `FormSuccessResult`
- `onSubmit` → dispatch `createCategoryAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseUpdateCategory.ts`

- `useForm<IUpdateCategoryCredentials>()`
- Pre-populates form when `selectedEntity` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

### `UseAddCategoryPricing.ts`

- `useForm<IAddCategoryPricingCredentials>()`
- Requires `categoryId` to be passed in
- `onSubmit` → dispatch `addCategoryPricingAction` → `showNotification` → `reload()`
- Exposes: `form`, `loading`, `error`, `onSubmit`, `reset`

### `UseManageCategoryPricing.ts`

- Combines update pricing and remove pricing actions for the pricing management modal/drawer
- `onUpdatePricing(pricingId, data)` → dispatch → `showNotification` → `reload()`
- `onRemovePricing(pricingId)` → dispatch → `showNotification` → `reload()`
- Exposes: `updateLoading`, `removeLoading`, `error`, `onUpdatePricing`, `onRemovePricing`

---

## Customers (3 hooks)

### `UseCustomersList.ts`

- Dispatches `getCustomersAction(params)` on mount and on page/pageSize change
- Manages `page`, `pageSize` state (no status filter — customers have no `isActive`)
- Exposes: `items`, `total`, `page`, `pageSize`, `loading`, `error`, `reload`

### `UseCreateCustomer.ts`

- `useForm<ICreateCustomerCredentials>()`
- `success` state for `FormSuccessResult`
- `onSubmit` → dispatch `createCustomerAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseUpdateCustomer.ts`

- `useForm<IUpdateCustomerCredentials>()`
- Pre-populates form when `selectedEntity` changes
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetUpdate`

---

## Packages (5 hooks)

### `UsePackagesList.ts`

- Dispatches `getPackagesAction(params)` on mount and on page/pageSize change
- Manages `page`, `pageSize`, `statusFilter` state (`"all" | "active" | "inactive"`)
- Passes `isActive` query param to the server when filter is not `"all"`
- Exposes: `items`, `total`, `page`, `pageSize`, `loading`, `error`, `statusFilter`, `onPageChange`, `onStatusFilterChange`, `reload`

### `UsePackageActions.ts`

- Selects `activatePackage` and `deactivatePackage` from store
- `onActivate(id)` → dispatch → `showNotification` → `reload()`
- `onDeactivate(id)` → dispatch → `showNotification` → `reload()`
- Exposes: `loading`, `error`, `onActivate`, `onDeactivate`

### `UseCreatePackage.ts`

- `useForm<ICreatePackageCredentials>()`
- `success` state for `FormSuccessResult`
- `onSubmit` → dispatch `createPackageAction` → set success
- Exposes: `form`, `loading`, `error`, `success`, `onSubmit`, `resetCreate`

### `UseAddPackageSlot.ts`

- `useForm<IAddPackageSlotCredentials>()`
- Requires `packageId` to be passed in
- `onSubmit` → dispatch `addPackageSlotAction` → `showNotification` → `reload()`
- Exposes: `form`, `loading`, `error`, `onSubmit`, `reset`

### `UseManagePackageSlots.ts`

- Handles remove slot action for the slot management modal/drawer
- `onRemoveSlot(slotId)` → dispatch `removePackageSlotAction` → `showNotification` → `reload()`
- Exposes: `loading`, `error`, `onRemoveSlot`

---

## Key Differences from Lookup Hooks

1. **Server-side pagination** — list hooks dispatch with `IPaginationParams` (`page`, `pageSize`), not a void action
2. **Server-side status filter** — `isActive` is sent as a query param, not filtered client-side
3. **Pricing/slot management hooks** — categories and packages have additional hooks for nested resource management
4. **Customers have no actions hook** — no activate/deactivate, no status filter
5. **Packages have no update hook** — there is no update endpoint for packages (set at creation)

---

## TODO

- [ ] Create 6 category hooks with JSDoc
- [ ] Create 3 customer hooks with JSDoc
- [ ] Create 5 package hooks with JSDoc
