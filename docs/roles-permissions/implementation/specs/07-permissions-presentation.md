# Phase 7: Permissions — Presentation Layer

Same structure as Phase 4 (Roles presentation) but adapted for permission fields (resource, action, description).

**Ref**: [field-specifications.md](../../documentations/field-specifications.md), [ui-components.md](../../documentations/ui-components.md)

**Pattern reference**: Phase 4 roles presentation

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). Same rules as Phase 4: Ant Design components first, BEM notation, shared SCSS variables, minimal custom styles.

---

## Presentation Models

### `src/modules/permissions/presentation/model/ICreatePermissionCredentials.ts`

- [ ] `resource: string`, `action: string`, `description: string`

### `src/modules/permissions/presentation/model/IUpdatePermissionCredentials.ts`

- [ ] `resource?: string`, `action?: string`, `description?: string`

### `src/modules/permissions/presentation/model/IPermissionsQueryParams.ts`

- [ ] Same shape as `IRolesQueryParams`: `pageIndex`, `pageSize`, `search?`, `isActive?`, `isDeleted?`

---

## Validators

### `src/modules/permissions/presentation/utils/validators/permissions.validator.ts`

- [ ] `resource(label)`: `[required(label), max(label, 15)]`
- [ ] `action(label)`: `[required(label), max(label, 15)]`
- [ ] `description(label)`: `[required(label), max(label, 300)]`

---

## Notifications

### `src/modules/permissions/presentation/utils/notification/permissions.notification.ts`

- [ ] 7 success entries: `createSuccess`, `updateSuccess`, `activateSuccess`, `deactivateSuccess`, `softDeleteSuccess`, `hardDeleteSuccess`, `restoreSuccess`
- [ ] All in French, all `type: "success"`

---

## Hooks

### `UsePermissionsList.ts`

- [ ] Same structure as `UseRolesList` — paginated list with search/filter
- [ ] Dispatches `getAllPermissionsAction`

### `UseCreatePermission.ts`

- [ ] Same pattern as `UseCreateRole`
- [ ] Uses `createPermissionAction`

### `UseUpdatePermission.ts`

- [ ] Same pattern as `UseUpdateRole`
- [ ] Uses `updatePermissionAction`

### `UsePermissionActions.ts`

- [ ] Same pattern as `UseRoleActions`
- [ ] 5 actions: activate, deactivate, softDelete, hardDelete, restore

---

## Components

### `forms/PermissionForm/`

- [ ] 3 fields: Ressource (`Input`, max 15), Action (`Input`, max 15), Description (`TextArea`, max 300, showCount)
- [ ] `ErrorAlert` at top
- [ ] Shared form for create/edit via `formContext` prop

### `tables/PermissionsTable/columns.tsx`

- [ ] Columns: Ressource (blue Tag), Action (geekblue Tag), Description (ellipsis), Statut, Supprimé, Créé le, Actions
- [ ] Same action dropdown pattern as roles
- [ ] Mutation items hidden for non-SuperAdmin

### `ui/PermissionActionModal/`

- [ ] Same pattern as `RoleActionModal` — wraps shared `ActionModal`
- [ ] French titles/descriptions for each action type

---

## Container

### `containers/PermissionsListContainer/`

- [ ] Same layout as `RolesListContainer`
- [ ] Wires `usePermissionsList`, `useCreatePermission`, `useUpdatePermission`, `usePermissionActions`
- [ ] Renders: ErrorAlert → PageHeader → filters row → Table → CreateEditModal → PermissionActionModal

---

## Page

### `pages/PermissionsPage/index.tsx`

- [ ] Renders `PermissionsListContainer`
- [ ] Default export for lazy loading
