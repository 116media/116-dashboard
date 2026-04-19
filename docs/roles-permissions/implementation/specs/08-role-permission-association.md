# Phase 8: Role-Permission Association

Permission picker and bulk update for managing which permissions are assigned to a role.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md#role-permission-association-endpoints-3), [ui-components.md](../../documentations/ui-components.md#permissionpicker-phase-4)

**Depends on**: Phase 4 (Roles) + Phase 7 (Permissions) completed

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). The `Transfer` and `Tabs` components are from Ant Design — avoid wrapping them in custom HTML. Use shared SCSS variables for any spacing overrides.

---

## Overview

This phase uses the 3 association endpoints already defined in the roles repository (Phase 2):

- `POST /api/v1/admin/roles/{id}/permissions` — assign single permission
- `DELETE /api/v1/admin/roles/{id}/permissions/{permissionId}` — remove single permission
- `PUT /api/v1/admin/roles/{id}/permissions` — bulk replace all permissions

The primary UI is a **Transfer** component that lets SuperAdmin users pick which permissions belong to a role. The bulk update endpoint is the primary save mechanism.

---

## Hook

### `src/modules/roles/presentation/hooks/UseRolePermissions.ts`

- [ ] Define return type:

```ts
interface IUseRolePermissions {
    roleWithPermissions: IRoleWithPermissions | null;
    allPermissions: IPermissionEntity[];
    permissionsLoading: boolean;
    roleLoading: boolean;
    saving: boolean;
    error: Failure | null | undefined;
    onBulkUpdate: (permissionIds: string[]) => Promise<void>;
    fetchRole: (roleId: string) => void;
}
```

- [ ] Fetch role with permissions via `getRoleByIdAction` when `roleId` changes
- [ ] Fetch all permissions via `getAllPermissionsAction` (from permissions module) with large `pageSize` (e.g. 1000)
- [ ] `onBulkUpdate(permissionIds)`:
  - Dispatch `bulkUpdatePermissionsAction({ roleId, permissionIds })`
  - On success: show `showNotification` with success message, re-fetch role
  - On rejection: show backend error via `showNotification`
- [ ] Expose both loading states separately (role loading vs. permissions loading vs. saving)

---

## Permission Picker Component

### `src/modules/roles/presentation/components/ui/PermissionPicker/index.tsx`

- [ ] Define props:

```ts
interface IPermissionPickerProps {
    currentPermissionIds: string[];       // currently assigned permission IDs
    allPermissions: IPermissionEntity[];  // all available permissions
    loading: boolean;
    onChange: (selectedIds: string[]) => void;
}
```

- [ ] Use Ant Design `Transfer` component:
  - `dataSource`: map `allPermissions` to Transfer items with `key: id`, `title: "${resource}:${action}"`
  - `targetKeys`: `currentPermissionIds`
  - `onChange`: calls `onChange` prop with new target keys
  - `showSearch`: true
  - `filterOption`: search on `resource`, `action`, `description`
  - `titles`: `["Disponibles", "Assignées"]`

- [ ] Custom item render: show `resource:action` as primary text, `description` as secondary

- [ ] Optional: group permissions by `resource` using Transfer's `render` prop for better navigation

---

## Integration into Edit Role Flow

### Modify `src/modules/roles/presentation/containers/RolesListContainer/index.tsx`

When editing a role, the `CreateEditModal` should show two sections (or tabs):

**Option A — Tabs inside modal** (recommended):

```tsx
<CreateEditModal ...editModalProps>
    <Tabs defaultActiveKey="info">
        <TabPane tab="Informations" key="info">
            <RoleForm form={editForm} error={editError} formContext="EDIT" initialValues={selectedRole} />
        </TabPane>
        <TabPane tab="Permissions" key="permissions">
            <PermissionPicker
                currentPermissionIds={rolePermissions.map(p => p.id)}
                allPermissions={allPermissions}
                loading={permissionsLoading}
                onChange={setSelectedPermissionIds}
            />
            <Button type="primary" onClick={handleSavePermissions} loading={saving}>
                Enregistrer les permissions
            </Button>
        </TabPane>
    </Tabs>
</CreateEditModal>
```

**Option B — Separate modal:**

A dedicated "Gérer les permissions" button in the action dropdown opens a standalone modal with just the Transfer picker.

- [ ] Choose approach and implement
- [ ] Wire `useRolePermissions` hook
- [ ] On save: call `onBulkUpdate(selectedPermissionIds)`, show success notification
- [ ] On error: `ErrorAlert` or toast with backend error

---

## Role Permissions Panel (Read-Only View)

### `src/modules/roles/presentation/components/ui/RolePermissionsPanel/index.tsx` (optional)

A read-only view of a role's permissions, shown outside the edit modal (e.g. in an expandable row or detail panel):

- [ ] Props: `permissions: IPermissionEntity[]`, `loading: boolean`
- [ ] Group by `resource`
- [ ] Render as chips/tags: `resource:action`
- [ ] Empty state: "Aucune permission assignée"

---

## Verification

- [ ] Open edit role modal → "Permissions" tab shows Transfer with all permissions
- [ ] Left panel shows unassigned permissions, right panel shows assigned
- [ ] Search works in both panels
- [ ] Save updates the role's permissions via bulk update endpoint
- [ ] Error from save shows as notification with backend message
- [ ] Closing and reopening the modal re-fetches the current state
