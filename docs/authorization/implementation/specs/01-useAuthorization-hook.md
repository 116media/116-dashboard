# Phase 1: `useAuthorization` Hook

The single source of truth for all authorization decisions in the app.

**Ref**: [`docs/architecture/auth-route-guard.md`](../../../architecture/auth-route-guard.md)

---

## File

**`src/modules/auth/presentation/hooks/UseAuthorization.ts`**

## Interface

```ts
type PermissionCheck = { resource: string; action: string };

interface IUseAuthorization {
    isSuperAdmin: boolean;
    isAdmin: boolean;
    isAdminOrSuperAdmin: boolean;
    hasPermission: (check: PermissionCheck) => boolean;
    hasEvery: (checks: PermissionCheck[]) => boolean;
    hasSome: (checks: PermissionCheck[]) => boolean;
}
```

## Implementation

- [ ] Read `user` from `useAppSelector(({ session: { currentUser } }) => currentUser.data)`
- [ ] Compute `isSuperAdmin` via `useMemo`: `user?.roles.some(r => r.name === "SuperAdmin") ?? false`
- [ ] Compute `isAdmin` via `useMemo`: `user?.roles.some(r => r.name === "Admin") ?? false`
- [ ] Compute `isAdminOrSuperAdmin`: `isSuperAdmin || isAdmin`
- [ ] Create `hasPermission` via `useMemo`:
  - If no user → return `() => false`
  - If `isSuperAdmin` → return `() => true` (bypass)
  - Otherwise → check `user.permissions.some(p => p.resource === check.resource && p.action === check.action && p.isActive)`
- [ ] Create `hasEvery` via `useMemo`:
  - If `isSuperAdmin` → return `() => true`
  - Otherwise → `(checks) => checks.every(hasPermission)`
- [ ] Create `hasSome` via `useMemo`:
  - If `isSuperAdmin` → return `() => true`
  - Otherwise → `(checks) => checks.some(hasPermission)`

## Design Decisions

1. **SuperAdmin bypass inside the hook** — consuming code never needs `isSuperAdmin || hasPermission(...)`. The bypass is encapsulated.
2. **Memoized functions** — `hasPermission`, `hasEvery`, `hasSome` return stable references to avoid unnecessary rerenders.
3. **`isActive` filter** — only active permissions are checked. Deactivated permissions are ignored.
4. **Role constants** — define `UserRole.SuperAdmin = "SuperAdmin"` and `UserRole.Admin = "Admin"` as constants, matching the backend `EnumCoreUserRole`.

## Verification

- [ ] SuperAdmin user → `isSuperAdmin` is `true`, `hasPermission(anything)` returns `true`
- [ ] Admin user with no permissions → `isAdmin` is `true`, `hasPermission(anything)` returns `false`
- [ ] Admin user with `articles:read` permission → `hasPermission({ resource: "articles", action: "read" })` returns `true`
- [ ] Logged out user → all checks return `false`
