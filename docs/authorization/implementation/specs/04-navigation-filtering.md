# Phase 4: Navigation Filtering

Filter sidebar navigation items based on the user's permissions.

**Depends on**: Phase 1 (`useAuthorization` hook)

---

## Overview

The sidebar currently shows all navigation items to all authenticated users. When custom roles with limited permissions exist, users should only see nav items for resources they can access.

---

## Files to Modify

### 1. `src/shared/presentation/constants/navigation.ts`

Add an optional `permission` field to `INavigationItem`:

```ts
export interface INavigationItem {
    path: string;
    label: string;
    icon: FC;
    permission?: { resource: string; action: string };
}
```

Update `NAVIGATION_ITEMS`:

Navigation now uses **grouped items** with `children`. Each group is a Popover in the SideNav:

- [ ] Accueil `/overview` — no permission (always visible)
- [ ] **Références** (group) — children filtered by permission:
  - `/references/content-types` — `{ resource: "content-types", action: "read" }`
  - `/references/pricing-tiers` — `{ resource: "pricing-tiers", action: "read" }`
  - `/references/promotion-levels` — `{ resource: "promotion-levels", action: "read" }`
  - `/references/tags` — `{ resource: "tags", action: "read" }`
- [ ] **Catalogue** (group):
  - `/catalog/categories` — `{ resource: "categories", action: "read" }`
  - `/catalog/customers` — `{ resource: "customers", action: "read" }`
  - `/catalog/packages` — `{ resource: "packages", action: "read" }`
- [ ] **Édition** (group):
  - `/articles` — `{ resource: "articles", action: "read" }`
  - `/videos` — `{ resource: "videos", action: "read" }`
  - `/shorts` — `{ resource: "shorts", action: "read" }`
  - `/lyrics` — `{ resource: "lyrics", action: "read" }`
- [ ] **Ventes** (group):
  - `/orders` — `{ resource: "orders", action: "read" }`
- [ ] **Publicité** (group):
  - `/ads/banners` — `{ resource: "ads", action: "read" }`
  - `/ads/popups` — `{ resource: "ads", action: "read" }`
- [ ] **Gestion** (group):
  - `/admins` — `{ resource: "admins", action: "read" }`
  - `/users` — `{ resource: "users", action: "read" }`
  - `/roles` — `{ resource: "roles", action: "read" }`
  - `/permissions` — `{ resource: "permissions", action: "read" }`
- [ ] Paramètres `/settings` — no permission (always visible)

### 2. `src/shared/presentation/layouts/DashboardLayout/SideNav/index.tsx`

- [ ] Import `useAuthorization` hook
- [ ] Filter `NAVIGATION_ITEMS` before rendering:

```tsx
const { hasPermission } = useAuthorization();

const visibleItems = NAVIGATION_ITEMS.filter(
    (item) => !item.permission || hasPermission(item.permission)
);
```

- [ ] Render `visibleItems` instead of `NAVIGATION_ITEMS`

---

## Design Decisions

1. **Optional `permission` field** — Items without a `permission` (Overview, Settings) are always visible. This avoids creating dummy permissions for non-resource pages.
2. **SuperAdmin sees everything** — The `hasPermission` function already returns `true` for SuperAdmin (bypass inside the hook), so no special handling is needed.
3. **No `permission` on Settings** — Settings is the user's own profile, not a resource that can be restricted.

---

## Verification

- [ ] SuperAdmin sees all 11 navigation items
- [ ] Admin with all permissions sees all 11 items
- [ ] Admin with only `roles:read` permission sees: Overview, Rôles, Paramètres (3 items)
- [ ] Admin with no permissions sees: Overview, Paramètres (2 items)
- [ ] Navigation items update when user permissions change (e.g., after role assignment)
