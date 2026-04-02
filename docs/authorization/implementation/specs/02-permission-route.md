# Phase 2: `PermissionRoute` Component

Route-level guard that prevents unauthorized users from accessing pages.

**Ref**: [`docs/architecture/auth-route-guard.md`](../../../architecture/auth-route-guard.md)

**Depends on**: Phase 1 (`useAuthorization` hook)

---

## File

**`src/shared/presentation/components/PermissionRoute/index.tsx`**

## Interface

```tsx
interface IPermissionRouteProps {
    permissions: { resource: string; action: string }[];
    mode?: "every" | "some";
}
```

## Implementation

- [ ] Use `useAuthorization()` hook to get `hasEvery` and `hasSome`
- [ ] Select check function based on `mode` prop (default: `"every"`)
- [ ] If `check(permissions)` fails → `<Navigate to={NOT_FOUND_PATH} replace />`
- [ ] If check passes → `<Outlet />`
- [ ] Export as named export `PermissionRoute`

### Why redirect to 404 instead of 403?

Redirecting to a "Forbidden" page reveals that the route exists. Redirecting to 404 prevents information leakage — unauthorized users see the same page regardless of whether the route exists.

---

## Route Configuration

**File:** `src/routes.tsx`

### Current State

All protected routes are direct children of `<ProtectedRoute />` with no permission checks:

```tsx
// Current — no permission guard
{ path: ROLES_PATH, element: <RolesPage /> }
```

### Target State

Wrap routes with `<PermissionRoute>` using role-based checks. Since the backend currently uses role-based authorization (not `resource:action`), the initial implementation uses the `useAuthorization` role flags via a `roles` prop, or we use the fact that SuperAdmin bypass makes `hasPermission()` always return `true`.

For now, since all admin endpoints require `RequireAdminOrSuperAdmin` at minimum, and all dashboard users are Admin or SuperAdmin, the route guard primarily prevents future custom-role users from accessing pages they shouldn't see.

```tsx
// Target — with permission guard (ready for future fine-grained permissions)
{
    element: <PermissionRoute permissions={[{ resource: "roles", action: "read" }]} />,
    children: [
        { path: ROLES_PATH, element: <RolesPage /> }
    ]
}
```

### Full Route Map

- [ ] `/overview` — no permission required (accessible to all authenticated admins)
- [ ] `/references/*` — `content-types:read`, `pricing-tiers:read`, `promotion-levels:read`, `tags:read`
- [ ] `/catalog/*` — `categories:read`, `customers:read`, `packages:read`
- [ ] `/articles` — `articles:read`
- [ ] `/videos` — `videos:read`
- [ ] `/shorts` — `shorts:read`
- [ ] `/lyrics` — `lyrics:read`
- [ ] `/orders` — `orders:read`
- [ ] `/ads/banners`, `/ads/popups` — `ads:read`
- [ ] `/admins` — `admins:read`
- [ ] `/users` — `users:read`
- [ ] `/roles` — `roles:read`
- [ ] `/permissions` — `permissions:read`
- [ ] `/settings` — no permission required (own profile)

---

## Verification

- [ ] SuperAdmin can access all routes
- [ ] Admin without `roles:read` permission → redirected to 404 when accessing `/roles`
- [ ] Admin with `roles:read` permission → can access `/roles`
- [ ] Unauthenticated user → redirected to `/login` by `ProtectedRoute` (before `PermissionRoute` runs)
