# Phase 9: Integration

Wire the roles and permissions modules into the application: routes, navigation, root reducer, and end-to-end verification.

**Ref**: [overview.md](../../documentations/overview.md), [folder-structure.md](../../documentations/folder-structure.md)

---

## Route Constants

### Modify `src/shared/presentation/constants/paths.ts`

- [ ] Add `export const ROLES_PATH = "/roles";`
- [ ] Add `export const PERMISSIONS_PATH = "/permissions";`

---

## Navigation

### Modify `src/shared/presentation/constants/navigation.ts`

- [ ] Import `ROLES_PATH`, `PERMISSIONS_PATH` from paths
- [ ] Import `IconSafetyOutlined`, `IconUnlockOutlined` from Icons
- [ ] Add navigation items before the Settings entry:

```ts
{ path: ROLES_PATH, label: "Rôles", icon: IconSafetyOutlined },
{ path: PERMISSIONS_PATH, label: "Permissions", icon: IconUnlockOutlined },
```

### Modify `src/shared/presentation/ui/Icons/index.tsx`

- [ ] Export `IconSafetyOutlined` (from `@ant-design/icons`)
- [ ] Export `IconUnlockOutlined` (from `@ant-design/icons`)
- [ ] Follow the existing `export { XxxOutlined as IconXxxOutlined }` pattern

---

## Routes

### Modify `src/routes.tsx`

- [ ] Add lazy imports:

```ts
const RolesPage = lazy(() => import("@/modules/roles/presentation/pages/RolesPage"));
const PermissionsPage = lazy(() => import("@/modules/permissions/presentation/pages/PermissionsPage"));
```

- [ ] Add to `protectedRoutes` children (inside `DashboardLayout`):

```ts
{ path: ROLES_PATH, element: <RolesPage /> },
{ path: PERMISSIONS_PATH, element: <PermissionsPage /> },
```

- [ ] Import `ROLES_PATH`, `PERMISSIONS_PATH` from paths

---

## Root Reducer

### Modify `src/shared/presentation/store/root.reducer.ts`

- [ ] Import `rolesReducer` from `@/modules/roles/presentation/store`
- [ ] Import `permissionsReducer` from `@/modules/permissions/presentation/store`
- [ ] Add to `combineReducers`:

```ts
const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    settings: settingsReducer,
    roles: rolesReducer,
    permissions: permissionsReducer
});
```

- [ ] Verify `IRootState` automatically includes `roles` and `permissions`
- [ ] Neither slice is added to Redux persist whitelist

---

## Service Locator

### Modify `src/shared/infrastructure/service.locator.ts`

- [ ] Extend `Cradle` interface with:
  - Roles: `rolesRepository`, 12 use case types
  - Permissions: `permissionsRepository`, 9 use case types
- [ ] Import and call:
  - `registerRolesDependencies(container)`
  - `registerPermissionsDependencies(container)`

---

## Authorization Helper (optional but recommended)

### Create `src/shared/presentation/hooks/useIsSuperAdmin.ts`

- [ ] Hook that checks `session.currentUser.data.roles` for `"SuperAdmin"`
- [ ] Returns `boolean`
- [ ] Used by `RolesListContainer` and `PermissionsListContainer` to hide mutation buttons for non-SuperAdmin users

---

## Verification Checklist

### Build

- [ ] `npm run build` passes (TypeScript + Vite)
- [ ] `npx biome check src/` passes (linting/formatting)
- [ ] No circular dependency errors

### Roles Page

- [ ] Navigate to `/roles` — page loads
- [ ] Table shows paginated list of roles from API
- [ ] Search filters roles by name/description (server-side)
- [ ] Status filter (Tous/Actifs/Inactifs/Supprimés) re-fetches from API
- [ ] Pagination works: page change, page size change
- [ ] "Créer un rôle" button opens create modal (SuperAdmin only)
- [ ] Create form validates (name required, max 20; description required, max 300)
- [ ] Create success: `FormSuccessResult` shown, table refreshed, toast notification
- [ ] Create error (409 conflict): inline `ErrorAlert` in form with backend message
- [ ] Edit modal pre-populates from selected role
- [ ] Update success: same flow as create
- [ ] Activate action: confirmation modal → success toast → table refreshed
- [ ] Deactivate action: same
- [ ] Soft delete: same, danger confirmation
- [ ] Restore soft-deleted role: same
- [ ] Hard delete: same, danger confirmation, role permanently removed
- [ ] Core role protection: attempting to modify/delete a core role shows backend error
- [ ] Admin user: sees table but all mutation buttons are hidden
- [ ] Fetch error: `ErrorAlert` with retry button
- [ ] Action error: toast with backend `Failure.title` / `Failure.detail`

### Permissions Page

- [ ] Same checklist as roles but with resource/action/description fields
- [ ] Resource+action compound unique constraint enforced by backend (409 on conflict)
- [ ] Resource and Action columns render as `Tag` components

### Role-Permission Association

- [ ] Edit role → Permissions tab shows Transfer component
- [ ] Left panel: all available permissions
- [ ] Right panel: currently assigned permissions
- [ ] Search works in Transfer
- [ ] Save triggers bulk update endpoint
- [ ] Save success: notification, permissions updated
- [ ] Save error: notification with backend error

### Cross-Cutting

- [ ] Sidebar navigation shows Rôles and Permissions items with correct icons
- [ ] No console errors on any page
- [ ] Loading states: skeleton/spinner shown during API calls
- [ ] Empty states: "Aucun rôle" / "Aucune permission" when no data
- [ ] Responsive: table scrolls horizontally on small screens
- [ ] All text is in French
- [ ] All error messages come from backend — no hardcoded error strings
