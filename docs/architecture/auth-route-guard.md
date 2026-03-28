# Authorization & Route Guard Architecture

## Table of Contents

- [Overview](#overview)
- [Backend Permission Model](#backend-permission-model)
- [Domain Entities](#domain-entities)
- [Data Flow](#data-flow)
- [Authorization Hook — `useAuthorization`](#authorization-hook--useauthorization)
- [Route Guard — `PermissionRoute`](#route-guard--permissionroute)
- [Route Configuration](#route-configuration)
- [SuperAdmin Bypass](#superadmin-bypass)
- [UI-Level Authorization](#ui-level-authorization)
- [Architecture Diagram](#architecture-diagram)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Testing Strategy](#testing-strategy)
- [Key Files](#key-files)

---

## Overview

The dashboard implements a **resource + action** permission model that mirrors the backend API. Authorization is enforced at two levels:

1. **Route level** — via `<PermissionRoute />`, which wraps routes that require specific permissions.
2. **UI level** — via the `useAuthorization()` hook, which controls visibility of buttons, menus, and other interactive elements.

All authorization logic flows through a **single source of truth**: the `useAuthorization` hook. This ensures the SuperAdmin bypass, permission checks, and role checks are never duplicated.

---

## Backend Permission Model

The backend defines three **core system roles** that cannot be deleted:

| Role          | Description                                      |
| ------------- | ------------------------------------------------ |
| `SuperAdmin`  | Full access — bypasses all permission checks     |
| `Admin`       | Standard administrative access, bound by permissions |
| `Visitor`     | Read-only or minimal access                      |

Custom roles can be created and assigned any combination of permissions.

### Permission Structure

Each permission is a pair of:

- **`resource`** — the entity being accessed (e.g., `"articles"`, `"users"`, `"analytics"`, `"roles"`)
- **`action`** — the operation being performed (e.g., `"create"`, `"read"`, `"update"`, `"delete"`)

Permissions are assigned either:

- **Directly to a user** — via `user.permissions[]` (additive)
- **Through a role** — via `role.permissions[]` (inherited when role is assigned to user)

The backend flattens both sources into the `UserResponseDto.permissions[]` array returned at login.

---

## Domain Entities

### `IPermission`

```ts
// src/modules/auth/domain/entities/IPermission.ts

interface IPermission {
    id: string;
    resource: string;   // e.g., "articles", "users", "analytics"
    action: string;     // e.g., "create", "read", "update", "delete"
    description: string;
}
```

### `IRole`

```ts
// src/modules/auth/domain/entities/IRole.ts

interface IRole {
    id: string;
    name: string;        // e.g., "SuperAdmin", "Admin", "Editor"
    description: string;
}
```

### `IUser` (relevant fields)

```ts
// src/modules/auth/domain/entities/IUser.ts

interface IUser {
    id: string;
    userName: string;
    roles: IRole[];              // Assigned roles
    permissions: IPermission[];  // Flattened permissions (role + direct)
    // ...other fields
}
```

### `IAuthResponse`

```ts
// src/modules/auth/domain/entities/IAuthResponse.ts

interface IAuthResponse {
    token: string;    // JWT stored in localStorage
    user: IUser;      // Complete user with roles & permissions
}
```

---

## Data Flow

```
1. User submits credentials
         ↓
2. API returns AdminLoginResponse { token, user { roles, permissions } }
         ↓
3. AuthMapper maps DTOs → domain entities (IUser, IRole, IPermission)
         ↓
4. Token → localStorage via AuthStorageService.setToken()
   User  → Redux store via auth slice (encrypted with AES-256 via redux-persist)
         ↓
5. useAuthorization() reads from Redux → exposes hasPermission(), isSuperAdmin, etc.
         ↓
6. <PermissionRoute /> and UI components consume the hook
```

### Storage Details

| Data            | Storage               | Mechanism                              |
| --------------- | --------------------- | -------------------------------------- |
| JWT Token       | `localStorage`        | `AuthStorageService.setToken()`        |
| User + Roles    | `localStorage`        | Redux Persist with AES-256 encryption  |
| Permissions     | `localStorage`        | Redux Persist with AES-256 encryption  |

---

## Authorization Hook — `useAuthorization`

**Location:** `src/modules/auth/presentation/hooks/useAuthorization.ts`

This is the **single source of truth** for all authorization decisions in the app.

```ts
import { useMemo } from "react";
import { useAppSelector } from "@/core/presentation/store/store";
import type { IPermission } from "@/modules/auth/domain/entities/IPermission";

const SUPERADMIN_ROLE = "SuperAdmin";

type PermissionCheck = Pick<IPermission, "resource" | "action">;

export const useAuthorization = () => {
    const user = useAppSelector((state) => state.auth.login.data?.user);

    const isSuperAdmin = useMemo(
        () => user?.roles.some((r) => r.name === SUPERADMIN_ROLE) ?? false,
        [user?.roles]
    );

    const hasPermission = useMemo(() => {
        if (!user) return () => false;
        if (isSuperAdmin) return () => true;

        return ({ resource, action }: PermissionCheck) =>
            user.permissions.some(
                (p) => p.resource === resource && p.action === action
            );
    }, [user, isSuperAdmin]);

    const hasEvery = useMemo(() => {
        if (isSuperAdmin) return () => true;
        return (checks: PermissionCheck[]) => checks.every(hasPermission);
    }, [hasPermission, isSuperAdmin]);

    const hasSome = useMemo(() => {
        if (isSuperAdmin) return () => true;
        return (checks: PermissionCheck[]) => checks.some(hasPermission);
    }, [hasPermission, isSuperAdmin]);

    return { isSuperAdmin, hasPermission, hasEvery, hasSome };
};
```

### Return Values

| Property        | Type                                           | Description                                      |
| --------------- | ---------------------------------------------- | ------------------------------------------------ |
| `isSuperAdmin`  | `boolean`                                      | `true` if user has the `SuperAdmin` role         |
| `hasPermission` | `(check: PermissionCheck) => boolean`          | Checks a single `{ resource, action }` pair      |
| `hasEvery`      | `(checks: PermissionCheck[]) => boolean`       | `true` if user has **all** listed permissions (AND) |
| `hasSome`       | `(checks: PermissionCheck[]) => boolean`       | `true` if user has **any** listed permission (OR)  |

### Design Decisions

- **Memoized functions** — `hasPermission`, `hasEvery`, and `hasSome` return stable references to avoid unnecessary rerenders in consuming components.
- **SuperAdmin bypass at function level** — When `isSuperAdmin` is `true`, the returned functions always return `true` without iterating permissions. This avoids scattering `if (isSuperAdmin)` checks throughout the codebase.
- **No user = no access** — If `user` is `null` (logged out), all checks return `false`.

---

## Route Guard — `PermissionRoute`

**Location:** `src/core/presentation/components/PermissionRoute/index.tsx`

A layout route component that gates access based on permissions.

```tsx
import type { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthorization } from "@/modules/auth/presentation/hooks/useAuthorization";
import { NOT_FOUND_PATH } from "@/shared/lib/constants/paths";
import type { IPermission } from "@/modules/auth/domain/entities/IPermission";

interface PermissionRouteProps {
    permissions: Pick<IPermission, "resource" | "action">[];
    mode?: "every" | "some";
}

export const PermissionRoute: FC<PermissionRouteProps> = ({
    permissions,
    mode = "every",
}) => {
    const { hasEvery, hasSome } = useAuthorization();
    const check = mode === "every" ? hasEvery : hasSome;

    if (!check(permissions)) {
        return <Navigate to={NOT_FOUND_PATH} replace />;
    }

    return <Outlet />;
};
```

### Props

| Prop          | Type                            | Default   | Description                                              |
| ------------- | ------------------------------- | --------- | -------------------------------------------------------- |
| `permissions` | `{ resource, action }[]`        | required  | Permissions required to access child routes              |
| `mode`        | `"every"` \| `"some"`          | `"every"` | `"every"` = AND (all required), `"some"` = OR (any one) |

### Behavior

- **Access granted** → renders `<Outlet />` (child routes)
- **Access denied** → redirects to the 404 page (`NOT_FOUND_PATH`)
- **SuperAdmin** → always granted (bypass happens inside `useAuthorization`)

### Why redirect to 404 instead of 403?

Redirecting to a "Forbidden" page reveals that the route exists. Redirecting to 404 prevents information leakage — unauthorized users cannot distinguish between "this route exists but I can't access it" and "this route doesn't exist."

---

## Route Configuration

**Location:** `src/routes.tsx`

Routes are organized into three groups:

### Guest Routes

Accessible only to **unauthenticated** users. Logged-in users are redirected to `/overview`.

```tsx
const guestRoutes: RouteObject[] = [
    {
        element: <GuestRoute />,
        children: [
            { path: LOGIN_PATH, element: <LoginPage /> },
            { path: FORGOT_PASSWORD_PATH, element: <ForgotPasswordPage /> }
        ]
    }
];
```

### Protected Routes

Accessible only to **authenticated** users. Unauthenticated users are redirected to `/login`.

Permission-gated routes are wrapped with `<PermissionRoute />`:

```tsx
const protectedRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute />,          // checks JWT token existence
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    // Open to all authenticated users
                    { path: OVERVIEW_PATH, element: <OverviewPage /> },
                    { path: SETTING_PATH, element: <SettingsPage /> },

                    // Permission-gated routes
                    {
                        element: <PermissionRoute permissions={[{ resource: "contents", action: "read" }]} />,
                        children: [
                            { path: CONTENT_PATH, element: <ContentsPage /> }
                        ]
                    },
                    {
                        element: <PermissionRoute permissions={[{ resource: "videos", action: "read" }]} />,
                        children: [
                            { path: VIDEO_PATH, element: <VideosPage /> }
                        ]
                    },
                    {
                        element: <PermissionRoute permissions={[{ resource: "articles", action: "read" }]} />,
                        children: [
                            { path: ARTICLE_PATH, element: <ArticlesPage /> }
                        ]
                    },
                    {
                        element: <PermissionRoute permissions={[{ resource: "ads", action: "read" }]} />,
                        children: [
                            { path: ADS_BANNER_PATH, element: <AdsBannerPage /> },
                            { path: ADS_POPUP_PATH, element: <AdsPopupPage /> }
                        ]
                    },
                    {
                        element: <PermissionRoute permissions={[{ resource: "admins", action: "read" }]} />,
                        children: [
                            { path: ADMIN_PATH, element: <AdminsPage /> }
                        ]
                    },
                    {
                        element: <PermissionRoute permissions={[{ resource: "users", action: "read" }]} />,
                        children: [
                            { path: USER_PATH, element: <UsersPage /> }
                        ]
                    }
                ]
            }
        ]
    }
];
```

### Error Routes

Catch-all routes for 404 handling:

```tsx
const errorRoutes: RouteObject[] = [
    { path: NOT_FOUND_PATH, element: <NotFoundPage /> },
    { path: "*", element: <Navigate to={NOT_FOUND_PATH} replace /> }
];
```

### Route Nesting Hierarchy

```
<Routes>
├── GuestRoute (no token → render, has token → redirect /overview)
│   ├── /login → LoginPage
│   └── /forgot-password → ForgotPasswordPage
│
├── ProtectedRoute (has token → render, no token → redirect /login)
│   └── DashboardLayout (sidebar + header + <Outlet />)
│       ├── /overview → OverviewPage                    [no permission required]
│       ├── /settings → SettingsPage                    [no permission required]
│       ├── PermissionRoute [contents:read]
│       │   └── /contents → ContentsPage
│       ├── PermissionRoute [videos:read]
│       │   └── /videos → VideosPage
│       ├── PermissionRoute [articles:read]
│       │   └── /articles → ArticlesPage
│       ├── PermissionRoute [ads:read]
│       │   ├── /ads/banners → AdsBannerPage
│       │   └── /ads/popups → AdsPopupPage
│       ├── PermissionRoute [admins:read]
│       │   └── /admins → AdminsPage
│       └── PermissionRoute [users:read]
│           └── /users → UsersPage
│
├── /page-introuvable → NotFoundPage
└── * → redirect to /page-introuvable
```

---

## SuperAdmin Bypass

The `SuperAdmin` role is a **core system role** defined by the backend. It cannot be deleted or modified.

### How the bypass works

The bypass is implemented **inside `useAuthorization`**, not at the call site:

```ts
// Inside useAuthorization
const hasPermission = useMemo(() => {
    if (!user) return () => false;
    if (isSuperAdmin) return () => true;  // ← bypass here
    // ...normal permission check
}, [user, isSuperAdmin]);
```

This means:

- `<PermissionRoute />` does **not** need to know about SuperAdmin — it just calls `hasEvery()` or `hasSome()`, which already return `true` for SuperAdmins.
- UI-level `hasPermission()` calls also automatically bypass for SuperAdmins.
- There is **zero** SuperAdmin-specific logic outside the hook.

### Why this matters

If the bypass were spread across components:

```tsx
// BAD — duplicated bypass logic
if (isSuperAdmin || hasPermission({ resource: "articles", action: "delete" })) { ... }
```

Every new permission check risks forgetting the bypass. By encapsulating it in the hook, the bypass is guaranteed and invisible to consumers.

---

## UI-Level Authorization

The same `useAuthorization` hook is used to conditionally render UI elements:

### Conditionally show a button

```tsx
const { hasPermission } = useAuthorization();

return (
    <div>
        <h1>Articles</h1>
        {hasPermission({ resource: "articles", action: "create" }) && (
            <Button type="primary" onClick={handleCreate}>
                New Article
            </Button>
        )}
    </div>
);
```

### Conditionally show a navigation item

```tsx
const { hasPermission } = useAuthorization();

const navItems = [
    { path: OVERVIEW_PATH, label: "Overview" }, // always visible
    hasPermission({ resource: "articles", action: "read" }) &&
        { path: ARTICLE_PATH, label: "Articles" },
    hasPermission({ resource: "users", action: "read" }) &&
        { path: USER_PATH, label: "Users" },
].filter(Boolean);
```

### Check multiple permissions (OR)

```tsx
const { hasSome } = useAuthorization();

// Show ads section if user can manage banners OR popups
{hasSome([
    { resource: "ads-banners", action: "read" },
    { resource: "ads-popups", action: "read" },
]) && <AdsSection />}
```

### Check multiple permissions (AND)

```tsx
const { hasEvery } = useAuthorization();

// Show bulk actions only if user can both update AND delete
{hasEvery([
    { resource: "articles", action: "update" },
    { resource: "articles", action: "delete" },
]) && <BulkActionsToolbar />}
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Login Flow                                  │
│                                                                     │
│  API Response ──→ AuthMapper ──→ Redux Store (encrypted)           │
│  { token, user }    maps DTOs      { auth.login.data.user }       │
│                     to entities      ├── roles: IRole[]            │
│                                      └── permissions: IPermission[]│
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    useAuthorization() Hook                          │
│                  (single source of truth)                           │
│                                                                     │
│  ┌─────────────────────────────────────────────┐                   │
│  │  isSuperAdmin?                              │                   │
│  │  ├── YES → all checks return true (bypass)  │                   │
│  │  └── NO  → check user.permissions[]         │                   │
│  └─────────────────────────────────────────────┘                   │
│                                                                     │
│  Exports:                                                          │
│  ├── isSuperAdmin: boolean                                         │
│  ├── hasPermission({ resource, action }): boolean                  │
│  ├── hasEvery([...checks]): boolean  (AND)                         │
│  └── hasSome([...checks]): boolean   (OR)                          │
└──────────┬──────────────────────────┬───────────────────────────────┘
           │                          │
           ▼                          ▼
┌─────────────────────┐   ┌──────────────────────────┐
│   Route Level       │   │   UI Level               │
│                     │   │                           │
│  <PermissionRoute   │   │  hasPermission(...)       │
│    permissions={[]} │   │  → show/hide buttons      │
│    mode="every"     │   │  → show/hide nav items    │
│  />                 │   │  → enable/disable actions  │
│                     │   │                           │
│  Denied → 404       │   │  Denied → not rendered    │
│  Granted → <Outlet/>│   │  Granted → rendered       │
└─────────────────────┘   └──────────────────────────┘
```

---

## API Reference

### `useAuthorization()`

```ts
const { isSuperAdmin, hasPermission, hasEvery, hasSome } = useAuthorization();
```

| Return        | Type                                       | Description                                 |
| ------------- | ------------------------------------------ | ------------------------------------------- |
| `isSuperAdmin`| `boolean`                                  | Whether the current user has SuperAdmin role |
| `hasPermission`| `({ resource, action }) => boolean`       | Check a single permission                   |
| `hasEvery`    | `(checks[]) => boolean`                    | Check all permissions (AND logic)           |
| `hasSome`     | `(checks[]) => boolean`                    | Check any permission (OR logic)             |

### `<PermissionRoute />`

```tsx
<PermissionRoute permissions={[...]} mode="every" | "some" />
```

| Prop          | Type                        | Default   | Description                         |
| ------------- | --------------------------- | --------- | ----------------------------------- |
| `permissions` | `{ resource, action }[]`    | required  | Required permissions                |
| `mode`        | `"every"` \| `"some"`      | `"every"` | AND vs OR matching                  |

### `<ProtectedRoute />`

```tsx
<ProtectedRoute />
```

Checks for JWT token in localStorage. No props. Redirects to `/login` if unauthenticated.

### `<GuestRoute />`

```tsx
<GuestRoute />
```

Inverse of ProtectedRoute. Redirects to `/overview` if already authenticated. No props.

---

## Examples

### Adding a new permission-gated route

```tsx
// 1. Add the path constant in src/shared/lib/constants/paths.ts
export const REPORTS_PATH = "/reports";

// 2. Create the lazy-loaded page
const ReportsPage = lazy(() => import("@/modules/reports/presentation/pages/ReportsPage"));

// 3. Add to protectedRoutes in src/routes.tsx
{
    element: <PermissionRoute permissions={[{ resource: "reports", action: "read" }]} />,
    children: [
        { path: REPORTS_PATH, element: <ReportsPage /> }
    ]
}
```

### Route requiring multiple permissions

```tsx
// User must be able to read AND update settings
{
    element: (
        <PermissionRoute
            permissions={[
                { resource: "settings", action: "read" },
                { resource: "settings", action: "update" }
            ]}
        />
    ),
    children: [
        { path: SETTING_PATH, element: <SettingsPage /> }
    ]
}
```

### Route accessible with any one of several permissions (OR)

```tsx
// User needs at least one of these permissions
{
    element: (
        <PermissionRoute
            permissions={[
                { resource: "ads-banners", action: "read" },
                { resource: "ads-popups", action: "read" }
            ]}
            mode="some"
        />
    ),
    children: [
        { path: ADS_BANNER_PATH, element: <AdsBannerPage /> },
        { path: ADS_POPUP_PATH, element: <AdsPopupPage /> }
    ]
}
```

---

## Testing Strategy

### Unit testing `useAuthorization`

```ts
// Mock the Redux store with different user states

// Test 1: SuperAdmin bypasses all checks
// → set user.roles = [{ name: "SuperAdmin", ... }]
// → expect hasPermission({ resource: "anything", action: "anything" }) === true

// Test 2: Regular user with specific permissions
// → set user.permissions = [{ resource: "articles", action: "read" }]
// → expect hasPermission({ resource: "articles", action: "read" }) === true
// → expect hasPermission({ resource: "articles", action: "delete" }) === false

// Test 3: No user (logged out)
// → set user = null
// → expect hasPermission(...) === false
// → expect isSuperAdmin === false
```

### Integration testing `PermissionRoute`

```tsx
// Render a route tree with PermissionRoute and verify:
// - Authorized user sees the child route content
// - Unauthorized user is redirected to NOT_FOUND_PATH
// - SuperAdmin always sees the child route content
```

---

## Key Files

| File                                                                  | Purpose                                    |
| --------------------------------------------------------------------- | ------------------------------------------ |
| `src/routes.tsx`                                                      | Route configuration with permission gates  |
| `src/modules/auth/presentation/hooks/useAuthorization.ts`            | Authorization hook (single source of truth)|
| `src/core/presentation/components/PermissionRoute/index.tsx`         | Route-level permission guard               |
| `src/core/presentation/components/ProtectedRoute/index.tsx`          | Authentication guard (token check)         |
| `src/core/presentation/components/GuestRoute/index.tsx`              | Guest-only guard (no token)                |
| `src/modules/auth/domain/entities/IPermission.ts`                    | Permission entity definition               |
| `src/modules/auth/domain/entities/IRole.ts`                          | Role entity definition                     |
| `src/modules/auth/domain/entities/IUser.ts`                          | User entity (carries roles + permissions)  |
| `src/modules/auth/infrastructure/mappers/auth.mapper.ts`             | DTO → domain entity mapping                |
| `src/modules/auth/infrastructure/storage/authstorage.service.ts`     | JWT token storage                          |
| `src/modules/auth/presentation/store/index.ts`                       | Auth Redux slice                           |
| `src/core/presentation/store/store.ts`                               | Redux store with encrypted persistence     |
| `src/shared/lib/constants/paths.ts`                                  | Route path constants                       |
