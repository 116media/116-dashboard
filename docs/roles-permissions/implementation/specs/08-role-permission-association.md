# Phase 8: Role-Permission Association

Assign and remove individual permissions from a role via dedicated modals.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md#role-permission-association-endpoints-3)

**Depends on**: Phase 4 (Roles) + Phase 7 (Permissions) completed

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). All components use Ant Design — avoid custom HTML wrappers. Use shared SCSS variables for spacing.

---

## Overview

This phase uses 2 of the 3 association endpoints already defined in the roles repository (Phase 2):

- `POST /api/v1/admin/roles/{id}/permissions` — assign a single permission
- `DELETE /api/v1/admin/roles/{id}/permissions/{permissionId}` — remove a single permission

The UI adds two new actions to the roles table dropdown:

- **"Assigner une permission"** — opens a modal with a searchable Select showing all available permissions. Permissions already assigned to the role are disabled/grayed-out.
- **"Retirer une permission"** — opens a modal with a searchable Select showing only the permissions currently assigned to the role.

Both modals display the role name, allow selecting one permission at a time, and confirm the action.

---

## TODO Checklist

### 1. Extend `RoleAction` type

- [ ] Add `"assignPermission"` and `"removePermission"` to the `RoleAction` union type in `columns.tsx`
- [ ] Add two new dropdown items in the actions column:
  - `"Assigner une permission"` — visible when `isSuperAdmin && !record.isDeleted`
  - `"Retirer une permission"` — visible when `isSuperAdmin && !record.isDeleted`

### 2. Create `UseRolePermissions` hook

**File:** `src/modules/roles/presentation/hooks/UseRolePermissions.ts`

- [ ] Define return type:

```ts
interface IUseRolePermissions {
    role: IRoleWithPermissions | null;
    allPermissions: IPermissionEntity[];
    roleLoading: boolean;
    permissionsLoading: boolean;
    assignLoading: boolean;
    removeLoading: boolean;
    assignError: Failure | null | undefined;
    removeError: Failure | null | undefined;
    fetchRole: (roleId: string) => void;
    fetchAllPermissions: () => void;
    onAssign: (roleId: string, permissionId: string) => Promise<void>;
    onRemove: (roleId: string, permissionId: string) => Promise<void>;
}
```

- [ ] `fetchRole(roleId)` — dispatches `getRoleByIdAction(roleId)` to load the role with its current permissions
- [ ] `fetchAllPermissions()` — dispatches `getAllPermissionsAction({ pageIndex: 0, pageSize: 1000, isActive: true, isDeleted: false })` to load all available permissions
- [ ] `onAssign(roleId, permissionId)`:
  - Dispatch `assignPermissionAction({ roleId, permissionId })`
  - On success: `showNotification(RolesNotification.assignPermissionSuccess)`, call `reload()`
  - On rejection: `showNotification` with backend `Failure.title` / `Failure.detail`
- [ ] `onRemove(roleId, permissionId)`:
  - Dispatch `removePermissionAction({ roleId, permissionId })`
  - On success: `showNotification(RolesNotification.removePermissionSuccess)`, call `reload()`
  - On rejection: `showNotification` with backend error
- [ ] Select loading/error from `roles.assignPermission`, `roles.removePermission`, `roles.getById`, `permissions.getAll`

### 3. Add notification configs

**File:** `src/modules/roles/presentation/utils/notification/roles.notification.ts`

- [ ] Add `assignPermissionSuccess`:
  - title: `"Permission assignée"`
  - description: `"La permission a été assignée au rôle avec succès."`
- [ ] Add `removePermissionSuccess`:
  - title: `"Permission retirée"`
  - description: `"La permission a été retirée du rôle avec succès."`

### 4. Create `RolePermissionModal` component

**File:** `src/modules/roles/presentation/components/ui/RolePermissionModal/index.tsx`

- [ ] Define props:

```ts
interface IRolePermissionModalProps {
    open: boolean;
    loading: boolean;
    error: Failure | null | undefined;
    role: IRoleWithPermissions | null;
    permissions: IPermissionEntity[];
    permissionsLoading: boolean;
    mode: "assign" | "remove";
    onConfirm: (permissionId: string) => void;
    onCancel: () => void;
}
```

- [ ] Modal title:
  - `"assign"` → `"Assigner une permission"`
  - `"remove"` → `"Retirer une permission"`
- [ ] Display the role name: `<Text>Rôle : <Text strong>{role.name}</Text></Text>`
- [ ] Searchable `Select` (single select, `showSearch`, `filterOption`):
  - **Assign mode**: `dataSource` = all permissions, with options already assigned rendered as `disabled`
  - **Remove mode**: `dataSource` = only the role's currently assigned permissions
  - Option label format: `resource:action` (e.g., `users:create`)
  - Option description: permission `description` shown as secondary text via `optionRender`
- [ ] `ErrorAlert` for API errors
- [ ] Footer: `[Annuler]` + `[Confirmer]` (Confirmer disabled until a permission is selected)
- [ ] Local state: `selectedPermissionId: string | null`
- [ ] On confirm: call `onConfirm(selectedPermissionId)`, reset selection
- [ ] On close/cancel: reset selection, call `onCancel`

### 5. Wire into `RolesListContainer`

**File:** `src/modules/roles/presentation/containers/RolesListContainer/index.tsx`

- [ ] Add `useRolePermissions(rolesList.reload)` hook
- [ ] Add state: `const [permissionModalOpen, setPermissionModalOpen] = useState(false)`
- [ ] Add state: `const [permissionMode, setPermissionMode] = useState<"assign" | "remove">("assign")`
- [ ] In `handleAction`:
  - `"assignPermission"` → set `selectedRole`, set mode to `"assign"`, fetch role by ID, fetch all permissions, open permission modal
  - `"removePermission"` → set `selectedRole`, set mode to `"remove"`, fetch role by ID, open permission modal
- [ ] Add `handlePermissionConfirm(permissionId)`:
  - If mode is `"assign"`: call `rolePermissions.onAssign(selectedRole.id, permissionId)`
  - If mode is `"remove"`: call `rolePermissions.onRemove(selectedRole.id, permissionId)`
  - Close modal on success
- [ ] Render `<RolePermissionModal>` with appropriate props

---

## Files Summary

| File | Action |
|------|--------|
| `components/tables/RolesTable/columns.tsx` | Modify — add 2 actions to `RoleAction` type and dropdown |
| `hooks/UseRolePermissions.ts` | Create — hook for assign/remove permission |
| `utils/notification/roles.notification.ts` | Modify — add 2 success notification configs |
| `components/ui/RolePermissionModal/index.tsx` | Create — modal with searchable Select |
| `containers/RolesListContainer/index.tsx` | Modify — wire hook, state, and modal |

---

## Verification

- [ ] Roles table dropdown shows "Assigner une permission" and "Retirer une permission"
- [ ] Assign modal: shows role name, searchable Select with all permissions, already-assigned ones are grayed-out/disabled
- [ ] Remove modal: shows role name, searchable Select with only assigned permissions
- [ ] Select a permission → Confirmer enabled → click → success notification → modal closes
- [ ] Assign a permission that's already assigned → disabled in the Select, cannot be selected
- [ ] Remove the last permission → empty Select with appropriate empty message
- [ ] API errors display via ErrorAlert in the modal
- [ ] Both actions hidden for non-SuperAdmin users and deleted roles
