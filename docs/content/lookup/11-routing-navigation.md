# Phase 11: Routing and Navigation

Path constants, navigation items, route registration, and cross-cutting wiring.

---

## Path Constants

**File:** `src/shared/presentation/constants/paths.ts`

Add:

```ts
export const CONTENT_TYPES_PATH = "/references/content-types";
export const PRICING_TIERS_PATH = "/references/pricing-tiers";
export const PROMOTION_LEVELS_PATH = "/references/promotion-levels";
export const TAGS_PATH = "/references/tags";
```

---

## Navigation Items

**File:** `src/shared/presentation/constants/navigation.ts`

Add 4 entries under the "Références" nav group (after any existing items and before Catalogue/Roles/Permissions):

```ts
{
    label: "Types de contenu",
    path: CONTENT_TYPES_PATH,
    icon: IconAppstoreOutlined,
    permission: { resource: "content-types", action: "read" }
},
{
    label: "Niveaux tarifaires",
    path: PRICING_TIERS_PATH,
    icon: IconDollarOutlined,
    permission: { resource: "pricing-tiers", action: "read" }
},
{
    label: "Promotions",
    path: PROMOTION_LEVELS_PATH,
    icon: IconStarOutlined,
    permission: { resource: "promotion-levels", action: "read" }
},
{
    label: "Tags",
    path: TAGS_PATH,
    icon: IconTagOutlined,
    permission: { resource: "tags", action: "read" }
},
```

> Icon choices should be verified — use appropriate icons from the existing `Icons/index.tsx` exports or add new ones.

---

## Route Registration

**File:** `src/routes.tsx`

Add 4 lazy imports:

```tsx
const ContentTypesPage = lazy(() => import("@/modules/lookup/presentation/pages/ContentTypesPage"));
const PricingTiersPage = lazy(() => import("@/modules/lookup/presentation/pages/PricingTiersPage"));
const PromotionLevelsPage = lazy(() => import("@/modules/lookup/presentation/pages/PromotionLevelsPage"));
const TagsPage = lazy(() => import("@/modules/lookup/presentation/pages/TagsPage"));
```

Add 4 `PermissionRoute`-wrapped entries inside the protected DashboardLayout children (all under the "Références" nav group):

```tsx
{
    element: <PermissionRoute permissions={[{ resource: "content-types", action: "read" }]} />,
    children: [{ path: CONTENT_TYPES_PATH, element: <ContentTypesPage /> }]
},
{
    element: <PermissionRoute permissions={[{ resource: "pricing-tiers", action: "read" }]} />,
    children: [{ path: PRICING_TIERS_PATH, element: <PricingTiersPage /> }]
},
{
    element: <PermissionRoute permissions={[{ resource: "promotion-levels", action: "read" }]} />,
    children: [{ path: PROMOTION_LEVELS_PATH, element: <PromotionLevelsPage /> }]
},
{
    element: <PermissionRoute permissions={[{ resource: "tags", action: "read" }]} />,
    children: [{ path: TAGS_PATH, element: <TagsPage /> }]
},
```

---

## Root Reducer

**File:** `src/shared/presentation/store/root.reducer.ts`

Add:

```ts
import lookupReducer from "@/modules/lookup/presentation/store";

// in combineReducers:
lookup: lookupReducer,
```

---

## Service Locator

**File:** `src/shared/infrastructure/service.locator.ts`

1. Import `ILookupRepositoryPort` and all 17 use case types
2. Extend `Cradle` interface with 18 entries (1 repository + 17 use cases)
3. Import and call `registerLookupDependencies(container)` at the bottom

---

## Icons

**File:** `src/shared/presentation/ui/Icons/index.tsx`

Export any new icons needed for navigation items (e.g., `AppstoreOutlined`, `DollarOutlined`, `StarOutlined`, `TagOutlined`).

---

## TODO

- [x] Add 4 path constants to `paths.ts`
- [x] Add 4 navigation items to `navigation.ts`
- [x] Add 4 lazy imports and 4 PermissionRoute entries to `routes.tsx`
- [x] Add `lookup` reducer to `root.reducer.ts`
- [x] Extend `Cradle` and call `registerLookupDependencies` in `service.locator.ts`
- [x] Export any needed icons in `Icons/index.tsx`
- [x] Add `useDebounce` hook for search inputs (added post-spec)
- [x] Create `StatusTag` shared component (added post-spec)
- [x] Create `RouteGuard` to replace GuestRoute/ProtectedRoute (added post-spec)
