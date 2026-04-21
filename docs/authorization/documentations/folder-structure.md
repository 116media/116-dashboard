# Folder Structure

Files to create and modify for the authorization implementation.

---

## New Files

```
src/modules/auth/presentation/hooks/
└── UseAuthorization.ts          # Single source of truth for all auth checks

src/shared/presentation/components/PermissionRoute/
└── index.tsx                    # Route-level permission guard
```

## Modified Files

| File | Change |
| --- | --- |
| `src/routes.tsx` | Wrap routes with `<PermissionRoute>` |
| `src/modules/roles/presentation/containers/RolesListContainer/index.tsx` | Replace `isSuperAdmin = true` with `useAuthorization()` |
| `src/modules/permissions/presentation/containers/PermissionsListContainer/index.tsx` | Replace `isSuperAdmin = true` with `useAuthorization()` |
| `src/shared/presentation/layouts/DashboardLayout/SideNav/index.tsx` | Filter nav items by permission |
| `src/shared/presentation/constants/navigation.ts` | Add `permission` field to `INavigationItem` |

## Architecture

```
useAuthorization()                     ← single source of truth
├── reads from session.currentUser.data.roles
├── reads from session.currentUser.data.permissions
├── exposes: isSuperAdmin, hasPermission(), hasEvery(), hasSome()
│
├── <PermissionRoute />               ← route-level guard
│   └── consumes hasEvery() / hasSome()
│   └── denied → redirect to 404
│
└── UI components                      ← element-level guard
    └── consume isSuperAdmin / hasPermission()
    └── denied → element not rendered
```
