# Phase 4: Roles — Presentation Layer

Hooks, form models, validators, notifications, form components, table columns, containers, and page.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [field-specifications.md](../../documentations/field-specifications.md)

**Pattern reference**: `src/platform/settings/presentation/hooks/`, `src/modules/auth/presentation/hooks/`

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). Use Ant Design components for layout (`Flex`, `Row`/`Col`, `Space`), text (`Typography`), and feedback (`Tag`, `Button`). One BEM block per SCSS module. No hardcoded colors — use shared `colors.scss` and `dimensions.scss` variables.

---

## Presentation Models

### `src/modules/roles/presentation/model/ICreateRoleCredentials.ts`

- [ ] `name: string`, `description: string`

### `src/modules/roles/presentation/model/IUpdateRoleCredentials.ts`

- [ ] `name?: string`, `description?: string`

### `src/modules/roles/presentation/model/IRolesQueryParams.ts`

- [ ] `pageIndex: number`, `pageSize: number`, `search?: string`, `isActive?: boolean`, `isDeleted?: boolean`

### `src/modules/roles/presentation/constants/roles.status.ts`

Module-specific status filter type and options (not shared — roles define their own statuses):

- [ ] Export `RoleStatusFilter` type: `"all" | "active" | "inactive" | "deleted"`
- [ ] Export `ROLE_STATUS_OPTIONS: IStatusOption<RoleStatusFilter>[]`:

```ts
export const ROLE_STATUS_OPTIONS: IStatusOption<RoleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" },
    { value: "deleted", label: "Supprimés" }
];
```

- [ ] Import `IStatusOption` from `@/shared/domain/types/pagination`

---

## Validators

### `src/modules/roles/presentation/utils/validators/roles.validator.ts`

- [ ] Export `RolesValidator` const object
- [ ] `name(label)`: `[required(label), max(label, 20)]`
- [ ] `description(label)`: `[required(label), max(label, 300)]`
- [ ] Import validator helpers from `@/shared/presentation/utils/validators/validators.utils`

---

## Notifications

### `src/modules/roles/presentation/utils/notification/roles.notification.ts`

- [ ] Export `RolesNotification` with 7 success entries (all French):
  - `createSuccess`, `updateSuccess`, `activateSuccess`, `deactivateSuccess`, `softDeleteSuccess`, `hardDeleteSuccess`, `restoreSuccess`
- [ ] Each entry: `{ type: "success", title: "...", description: "..." } as INotificationConfig`
- [ ] No error entries — errors come from backend `Failure.title`/`detail`

---

## Hooks

### `src/modules/roles/presentation/hooks/UseRolesList.ts`

- [ ] Define `IUseRolesList` return type (see [ui-components.md](../../documentations/ui-components.md#list-hook-pattern))
- [ ] Local state: `searchValue` (string), `statusFilter` (RoleStatusFilter, from `roles.status.ts`), `pageIndex` (number), `pageSize` (number, default 10)
- [ ] Select from `roles.getAll` via `useAppSelector`
- [ ] `useEffect`: dispatch `getAllRolesAction` when `searchValue`, `statusFilter`, `pageIndex`, or `pageSize` changes
- [ ] Convert `statusFilter` to `isActive`/`isDeleted` query params (see mapping in ui-components.md)
- [ ] `onSearch(value)`: set `searchValue`, reset `pageIndex` to 0
- [ ] `onPageChange(page, size)`: convert 1-based `page` to 0-based `pageIndex`
- [ ] `reload()`: re-dispatch with current params
- [ ] Return `roles`, `loading`, `error`, `statusFilter`, `searchValue`, `onSearch`, `onSearchChange`, `onStatusFilterChange`, `onPageChange`, `reload`

### `src/modules/roles/presentation/hooks/UseCreateRole.ts`

- [ ] Define return type: `{ form, loading, error, success, onSubmit, resetCreate }`
- [ ] `useForm<ICreateRoleCredentials>()`
- [ ] Select from `roles.create`
- [ ] `success`: local `useState<string | null>(null)`
- [ ] `onSubmit`: dispatch `createRoleAction(values)`
  - On `fulfilled.match`: set success message, `showNotification(RolesNotification.createSuccess)`, reset form
  - On rejection: error flows to Redux state → inline `ErrorAlert`
- [ ] `resetCreate`: clear success, dispatch `rolesSlice.actions.clear({ context: ActionType.CreateRole })`

### `src/modules/roles/presentation/hooks/UseUpdateRole.ts`

- [ ] Same structure as create, but uses `updateRoleAction({ id, data: values })`
- [ ] Pre-populate form via `useEffect` when `initialValues` prop changes
- [ ] Success shows `RolesNotification.updateSuccess`

### `src/modules/roles/presentation/hooks/UseRoleActions.ts`

- [ ] Define return type: `{ loading, error, onActivate, onDeactivate, onSoftDelete, onHardDelete, onRestore, resetActions }`
- [ ] Aggregate loading from `activate`, `deactivate`, `softDelete`, `hardDelete`, `restore` states
- [ ] Aggregate error from all 5 states
- [ ] Each action method:
  - Dispatch the thunk
  - On `fulfilled.match`: show success notification, call `reload()` (passed as hook param)
  - On `rejected.match`: show `showNotification({ type: "error", title: result.payload.title, description: result.payload.detail })`
- [ ] `resetActions`: purge all 5 action states

---

## Components

### `src/modules/roles/presentation/components/forms/RoleForm/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define props: `form: FormInstance`, `error: Failure | null | undefined`, `formContext: FormContext`, `initialValues?: IRoleEntity`
- [ ] Ant Design `Form`: `layout="vertical"`, `size="large"`, `validateTrigger={["onSubmit", "onBlur"]}`
- [ ] `ErrorAlert` at top for API errors
- [ ] Field 1 — Nom: `Input`, maxLength 20, rules `RolesValidator.name("Nom")`
- [ ] Field 2 — Description: `Input.TextArea`, maxLength 300, showCount, autoSize, rules `RolesValidator.description("Description")`
- [ ] `useEffect`: pre-populate when `formContext === "EDIT"` and `initialValues` changes
- [ ] `form.setFieldsValue` on edit, not `initialValues` prop (since modal uses `destroyOnHidden`)

### `src/modules/roles/presentation/components/tables/RolesTable/columns.tsx`

- [ ] Export `rolesTableColumns` function: `(onAction: (action: string, role: IRoleEntity) => void, isSuperAdmin: boolean) => ColumnsType<IRoleEntity>`
- [ ] Columns: Nom, Description (ellipsis+tooltip), Statut (Tag), Supprimé (Tag, hidden if !isDeleted), Créé le (formatted), Actions (TableActionDropdown)
- [ ] Action items: Modifier, Activer, Désactiver, Supprimer, Restaurer, Supprimer définitivement — visibility based on `isActive`/`isDeleted` state
- [ ] All mutation items hidden when `!isSuperAdmin`
- [ ] Date formatting: use `dayjs` or `Intl.DateTimeFormat` with French locale

### `src/modules/roles/presentation/components/ui/RoleActionModal/`

- [ ] Define props: `open`, `role: IRoleEntity | null`, `action: string | null`, `loading`, `error`, `onConfirm`, `onCancel`
- [ ] Map action type to `ActionModal` props using `ACTION_CONFIG` object (see ui-components.md)
- [ ] Delegate to shared `ActionModal`

---

## Container

### `src/modules/roles/presentation/containers/RolesListContainer/`

**Files**: `index.tsx` + `RolesListContainer.Loading.tsx`

- [ ] Wire hooks: `useRolesList()`, `useCreateRole()`, `useUpdateRole()`, `useRoleActions(reload)`
- [ ] Wire `useIsSuperAdmin()` for authorization gating
- [ ] Local state: `createOpen`, `editOpen`, `actionOpen`, `selectedRole`, `selectedAction`
- [ ] Render layout (matching the design reference):

```
<ErrorAlert error={fetchError} banner showIcon closable onClose={reload} />

<PageHeader
    title="Rôles"
    subtitle="Gérer les rôles et les accès."
    onCreate={isSuperAdmin ? openCreateModal : undefined}
    createLabel="Créer un rôle"
/>

<TableToolbar
    statusFilter={statusFilter}
    onStatusFilterChange={onStatusFilterChange}
    statusOptions={ROLE_STATUS_OPTIONS}
    searchValue={searchValue}
    onSearchChange={onSearchChange}
    onSearch={onSearch}
    searchLoading={loading}
/>

<Table
    rowKey="id"
    dataSource={roles.items}
    columns={rolesTableColumns(handleAction, isSuperAdmin)}
    loading={loading}
    rowSelection={{ type: "checkbox" }}
    pagination={{
        current: roles.pageIndex + 1,
        pageSize: roles.pageSize,
        total: roles.count,
        showSizeChanger: false,
        onChange: onPageChange,
        itemRender: (page, type, el) =>
            type === "prev" ? <a>← Précédent</a>
            : type === "next" ? <a>Suivant →</a>
            : el
    }}
/>

<CreateEditModal ...createModalProps>
    <RoleForm form={createForm} error={createError} formContext="CREATE" />
</CreateEditModal>

<CreateEditModal ...editModalProps>
    <RoleForm form={editForm} error={editError} formContext="EDIT" initialValues={selectedRole} />
</CreateEditModal>

<RoleActionModal
    open={actionOpen}
    role={selectedRole}
    action={selectedAction}
    loading={actionLoading}
    error={actionError}
    onConfirm={handleActionConfirm}
    onCancel={closeActionModal}
/>
```

- [ ] `handleAction(action, role)`: set `selectedRole` and `selectedAction`, open appropriate modal
- [ ] `handleActionConfirm`: dispatch the matching action from `useRoleActions`
- [ ] On create/update success: close modal, call `reload()`
- [ ] Loading skeleton: `RolesListContainer.Loading.tsx` with `Skeleton` placeholders

---

## Page

### `src/modules/roles/presentation/pages/RolesPage/index.tsx`

- [ ] Simple wrapper: renders `RolesListContainer`
- [ ] Default export for lazy loading in `routes.tsx`
