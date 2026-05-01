# Phase 11: Routing and Navigation

Path constants, navigation items, route registration, and cross-cutting wiring.

---

## Path Constants

**File:** `src/shared/presentation/constants/paths.ts`

Add:

```ts
export const CATEGORIES_PATH = "/catalog/categories";
export const CUSTOMERS_PATH = "/catalog/customers";
export const PACKAGES_PATH = "/catalog/packages";
```

---

## Navigation Items

**File:** `src/shared/presentation/constants/navigation.ts`

Add 3 entries as a standalone **"Catalogue"** top-level nav group (after the "Références" group and before Roles/Permissions). "Catalogue" is its own separate nav group — not a subsection under any other group:

```ts
{
    label: "Catégories",
    path: CATEGORIES_PATH,
    icon: IconAppstoreOutlined,
    permission: { resource: "categories", action: "read" }
},
{
    label: "Clients",
    path: CUSTOMERS_PATH,
    icon: IconTeamOutlined,
    permission: { resource: "customers", action: "read" }
},
{
    label: "Forfaits",
    path: PACKAGES_PATH,
    icon: IconGiftOutlined,
    permission: { resource: "packages", action: "read" }
},
```

> Icon choices should be verified — use appropriate icons from the existing `Icons/index.tsx` exports or add new ones.

---

## Route Registration

**File:** `src/routes.tsx`

Add 3 lazy imports:

```tsx
const CategoriesPage = lazy(() => import("@/modules/catalog/presentation/pages/CategoriesPage"));
const CustomersPage = lazy(() => import("@/modules/catalog/presentation/pages/CustomersPage"));
const PackagesPage = lazy(() => import("@/modules/catalog/presentation/pages/PackagesPage"));
```

Add 3 `PermissionRoute`-wrapped entries inside the protected DashboardLayout children:

```tsx
{
    element: <PermissionRoute permissions={[{ resource: "categories", action: "read" }]} />,
    children: [{ path: CATEGORIES_PATH, element: <CategoriesPage /> }]
},
{
    element: <PermissionRoute permissions={[{ resource: "customers", action: "read" }]} />,
    children: [{ path: CUSTOMERS_PATH, element: <CustomersPage /> }]
},
{
    element: <PermissionRoute permissions={[{ resource: "packages", action: "read" }]} />,
    children: [{ path: PACKAGES_PATH, element: <PackagesPage /> }]
},
```

---

## Root Reducer

**File:** `src/shared/presentation/store/root.reducer.ts`

Add:

```ts
import catalogReducer from "@/modules/catalog/presentation/store";

// in combineReducers:
catalog: catalogReducer,
```

---

## Service Locator

**File:** `src/shared/infrastructure/service.locator.ts`

1. Import `ICatalogRepositoryPort` and all 21 use case types
2. Extend `Cradle` interface with 22 entries (1 repository + 21 use cases)
3. Import and call `registerCatalogDependencies(container)` at the bottom

---

## Icons

**File:** `src/shared/presentation/ui/Icons/index.tsx`

Export any new icons needed for navigation items (e.g., `TeamOutlined`, `GiftOutlined`, `AppstoreOutlined` if not already exported from the lookup module).

---

## TODO

- [x] Add 3 path constants to `paths.ts`
- [x] Add 3 navigation items to `navigation.ts`
- [x] Add 3 lazy imports and 3 PermissionRoute entries to `routes.tsx`
- [x] Add `catalog` reducer to `root.reducer.ts`
- [x] Extend `Cradle` and call `registerCatalogDependencies` in `service.locator.ts`
- [x] Export any needed icons in `Icons/index.tsx`
