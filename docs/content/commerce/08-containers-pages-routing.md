# Phase 8: Containers, Pages, and Routing

List/detail containers, page wrappers, path constants, navigation items, and route registration.

---

## Containers

**Path:** `src/modules/commerce/presentation/containers/`

---

### `OrdersListContainer/index.tsx`

Wires `UseOrdersList`, manages create-order modal state:

```
PageHeader (title="Commandes", subtitle="Gérer les commandes", icon, onCreate)
TableToolbar (statusFilter dropdown — server-side)
Table (dataSource=items, columns, pagination)
CreateEditModal (create order) — conditional render
```

French labels:
- Page title: "Commandes"
- Subtitle: "Gérer les commandes"
- Create button: "Créer une commande"
- Create modal title: "Créer une commande"
- Status filter options: "Tous" | "Brouillon" | "paiement en cours" | "Payé" | "Annulé"

### `OrderDetailContainer/index.tsx`

Wires `UseOrderDetail`, `UseOrderActions`, `UsePaymentActions`:

```
OrderDetailView (passes order, payment, and all action handlers as props)
AddItemModal — conditional render (open when "Ajouter un article" is clicked)
AddTierModal — conditional render (open when an item's "Ajouter une tranche" is clicked)
AttachProofModal — conditional render (open when "Attacher une preuve" is clicked)
ConfirmActionModal — for submit / cancel / verify / reject confirmations
```

Key state managed in the container:
- `addItemOpen: boolean`
- `addTierOpen: boolean`, `selectedItemId: string | null`
- `attachProofOpen: boolean`
- `confirmAction: "submit" | "cancel" | "verify" | "reject" | null`

---

## Pages

**Path:** `src/modules/commerce/presentation/pages/`

Each page is a thin wrapper following the same pattern as other modules:

### `OrdersPage/index.tsx`

```tsx
const OrdersPage: FC = () => (
    <div className={styles.page}>
        <title>{`Commandes | ${APP_NAME}`}</title>
        <OrdersListContainer />
    </div>
);
```

### `OrderDetailPage/index.tsx`

```tsx
const OrderDetailPage: FC = () => (
    <div className={styles.page}>
        <title>{`Détail de la commande | ${APP_NAME}`}</title>
        <OrderDetailContainer />
    </div>
);
```

Each page has a matching `index.module.scss` with a `.page` class.

---

## Path Constants

**File:** `src/shared/presentation/constants/paths.ts`

Add:

```ts
export const ORDERS_PATH = "/orders";
export const ORDER_DETAIL_PATH = "/orders/:id";
```

---

## Navigation Items

**File:** `src/shared/presentation/constants/navigation.ts`

Add one top-level entry for the commerce section:

```ts
{
    label: "Commandes",
    path: ORDERS_PATH,
    icon: IconShoppingOutlined,
    permission: { resource: "orders", action: "read" }
},
```

> Icon choice should be verified against `src/shared/presentation/ui/Icons/index.tsx`. Add `ShoppingOutlined` export if not already present.

---

## Route Registration

**File:** `src/routes.tsx`

Add 2 lazy imports:

```tsx
const OrdersPage = lazy(() => import("@/modules/commerce/presentation/pages/OrdersPage"));
const OrderDetailPage = lazy(() => import("@/modules/commerce/presentation/pages/OrderDetailPage"));
```

Add 2 `PermissionRoute`-wrapped entries inside the protected `DashboardLayout` children:

```tsx
{
    element: <PermissionRoute permissions={[{ resource: "orders", action: "read" }]} />,
    children: [
        { path: ORDERS_PATH, element: <OrdersPage /> },
        { path: ORDER_DETAIL_PATH, element: <OrderDetailPage /> },
    ]
},
```

---

## Root Reducer

**File:** `src/shared/presentation/store/root.reducer.ts`

Add:

```ts
import commerceReducer from "@/modules/commerce/presentation/store";

// in combineReducers:
commerce: commerceReducer,
```

---

## Service Locator

**File:** `src/shared/infrastructure/service.locator.ts`

1. Import `ICommerceRepositoryPort` and all 13 use case types
2. Extend `Cradle` interface with 14 entries (1 repository + 13 use cases)
3. Import and call `registerCommerceDependencies(container)` at the bottom

---

## Icons

**File:** `src/shared/presentation/ui/Icons/index.tsx`

Export any new icons needed for navigation (e.g., `ShoppingOutlined`).

---

## TODO

- [ ] Create `OrdersListContainer` component with JSDoc
- [ ] Create `OrderDetailContainer` component with JSDoc
- [ ] Create `OrdersPage` component + `index.module.scss`
- [ ] Create `OrderDetailPage` component + `index.module.scss`
- [ ] Add `ORDERS_PATH` and `ORDER_DETAIL_PATH` to `paths.ts`
- [ ] Add navigation entry to `navigation.ts`
- [ ] Add 2 lazy imports and `PermissionRoute` entries to `routes.tsx`
- [ ] Add `commerce` reducer to `root.reducer.ts`
- [ ] Extend `Cradle` and call `registerCommerceDependencies` in `service.locator.ts`
- [ ] Export required icon(s) in `Icons/index.tsx`
