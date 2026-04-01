# Phase 9: Bulk Permission Management Modal

Full-screen modal to manage all permissions assigned to a role, with resource-based tab filtering, dual-panel layout, checkboxes, and bulk save via `PUT /api/v1/admin/roles/{id}/permissions`.

**Ref**: [api-endpoints.md](../../documentations/api-endpoints.md#role-permission-association-endpoints-3)

**Depends on**: Phase 8 (single assign/remove) completed

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). Use Ant Design components and props over custom HTML. BEM naming for all SCSS. No hardcoded values — reuse `dimensions` and `colors` from shared styles.

---

## Overview

This phase replaces the existing single-permission `RolePermissionModal` with a comprehensive bulk permission management modal. The modal uses the existing `PUT /api/v1/admin/roles/{id}/permissions` (bulk replace) endpoint already wired through:

- **Repository**: `bulkUpdatePermissions(roleId, permissionIds)` in `IRolesRepositoryPort`
- **Use case**: `BulkUpdatePermissionsUseCase`
- **Redux action**: `bulkUpdatePermissionsAction` in `roles/bulkUpdatePermissions`
- **Store state**: `roles.bulkUpdatePermissions` in `IRolesState`

---

## UI Design (from mockups)

### Modal Layout

The modal is an Ant Design `Modal` (not `CreateEditModal`) with custom layout:

```
┌──────────────────────────────────────────────────────────────────┐
│  🔴  Gestion des permissions — {role.name}                   ✕  │
│  ● Actif   {assignedCount} assignées                            │
│                                                                  │
│  🔍 Filtrer par ressource   [Toutes] [Articles] [Commentaires]  │
│                              [Paramètres] [Rapports] [Rôles]    │
│                              [Utilisateurs] [Vidéos]            │
│                                                                  │
│  ┌─── Disponibles ──── {count} ─┐  ┌─── Assignées ──── {count}─┐│
│  │ 🔍 Rechercher...             │  │ 🔍 Rechercher...          ││
│  │                              │  │                            ││
│  │ ☐ articles.lire         →    │  │ ☐ articles.créer          ││
│  │   Consulter les articles     │  │   Rédiger de nouveaux     ││
│  │                         ←    │  │   articles                ││
│  │                              │  │                            ││
│  │                              │  │ ☐ articles.modifier       ││
│  │                              │  │   Modifier les articles   ││
│  │                              │  │   existants               ││
│  │                              │  │                            ││
│  │                              │  │ ☐ articles.supprimer      ││
│  │                              │  │   Supprimer des articles  ││
│  └──────────────────────────────┘  └────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────┐        ┌────────────────────────────┐  │
│  │  Assigner (N) →     │        │  ← Retirer (N)             │  │
│  └─────────────────────┘        └────────────────────────────┘  │
│                                                                  │
│  Modifications en attente de sauvegarde    [Annuler] [Enregistrer]│
└──────────────────────────────────────────────────────────────────┘
```

### Key UI Elements

1. **Header**: Role avatar (Ant Design `Avatar` with first letter), title `"Gestion des permissions — {role.name}"`, close button
2. **Status badge**: `Tag` showing `● Actif` (green) or `● Inactif` (orange), plus `"{count} assignées"` text
3. **Resource tabs**: Ant Design `Tag` components acting as filter tabs — `"Toutes"` (default) + one tag per unique `resource` value (e.g., Articles, Commentaires, Paramètres, etc.). Capitalize first letter.
4. **Filter icon**: `IconFilterOutlined` before the tabs with label `"Filtrer par ressource"`
5. **Dual panels**: Two side-by-side columns:
   - **Left — "Disponibles"**: Permissions not yet assigned (filtered by active tab). Header shows count.
   - **Right — "Assignées"**: Permissions currently assigned (filtered by active tab). Header shows count (colored/highlighted).
6. **Search inputs**: Each panel has an `Input` with `SearchOutlined` prefix for filtering within the panel
7. **Permission items**: Each item is a `Checkbox` + `Tag` (colored, showing `resource.action`) + description text below
8. **Transfer buttons**: Center column with `→` (assign) and `←` (remove) arrow buttons. Enabled only when items are checked in the respective panel.
9. **Action buttons (bottom)**:
   - `"Assigner (N) →"` — purple/primary `Button`, count of checked items in left panel. Moves checked items to assigned panel locally.
   - `"← Retirer (N)"` — pink/secondary `Button`, count of checked items in right panel. Moves checked items to available panel locally.
10. **Footer**:
    - Left: `"Modifications en attente de sauvegarde"` warning text (visible when there are pending changes) + `"{totalAssigned} permissions assignées"` count when no changes
    - Right: `"Annuler"` button + `"Enregistrer"` button (with save icon). `Enregistrer` disabled when no pending changes.

### Behavior

- **All changes are local until "Enregistrer"**: Moving permissions between panels updates local state only. The `"Modifications en attente de sauvegarde"` text appears when local state differs from server state.
- **"Enregistrer" calls `bulkUpdatePermissionsAction`**: Sends the full list of assigned permission IDs. Backend adds new ones and removes those not in the list.
- **"Annuler" reverts**: Resets local state to match server state (role's current permissions).
- **Tab filtering**: Selecting a resource tab filters both panels to show only permissions with that `resource` value. "Toutes" shows all.
- **Search**: Filters within the currently visible panel by `resource`, `action`, or `description`.
- **Empty states**: "Aucune permission disponible" when left panel is empty for the active filter. Similar for right panel.

---

## TODO Checklist

### 1. Add `"managePermissions"` action to `RoleAction` type

**File:** `src/modules/roles/presentation/components/tables/RolesTable/columns.tsx`

- [ ] Add `"managePermissions"` to the `RoleAction` union type
- [ ] Add dropdown item:
  - key: `"managePermissions"`
  - label: `"Gérer les permissions"`
  - visible when: `isSuperAdmin && !record.isDeleted`
  - Position: after `"edit"`, before `"assignPermission"`

### 2. Exclude `"managePermissions"` from `RoleActionModal`

**File:** `src/modules/roles/presentation/components/ui/RoleActionModal/index.tsx`

- [ ] Add `"managePermissions"` to the `Exclude<>` type in `ACTION_CONFIG`
- [ ] Add `action === "managePermissions"` to the early return guard

### 3. Add notification configs

**File:** `src/modules/roles/presentation/utils/notification/roles.notification.ts`

- [ ] Add `bulkUpdatePermissionsSuccess`:
  - type: `"success"`
  - title: `"Permissions mises à jour"`
  - description: `"Les permissions du rôle ont été mises à jour avec succès."`

### 4. Extend `UseRolePermissions` hook

**File:** `src/modules/roles/presentation/hooks/UseRolePermissions.ts`

- [ ] Add to interface:

```ts
bulkLoading: boolean;
bulkError: Failure | null | undefined;
onBulkUpdate: (roleId: string, permissionIds: string[]) => Promise<void>;
```

- [ ] Select from Redux: `roles.bulkUpdatePermissions`
- [ ] `onBulkUpdate(roleId, permissionIds)`:
  - Dispatch `bulkUpdatePermissionsAction({ roleId, permissionIds })`
  - On success: `showNotification(RolesNotification.bulkUpdatePermissionsSuccess)`, call `reload()`
  - On rejection: `showNotification` with backend `Failure.title` / `Failure.detail`

### 5. Create `BulkPermissionModal` component

**File:** `src/modules/roles/presentation/components/ui/BulkPermissionModal/index.tsx`

- [ ] Props:

```ts
interface IBulkPermissionModalProps {
    open: boolean;
    loading: boolean;
    error: Failure | null | undefined;
    role: IRoleWithPermissions | null;
    permissions: IPermissionEntity[];
    permissionsLoading: boolean;
    onSave: (permissionIds: string[]) => void;
    onCancel: () => void;
}
```

- [ ] Local state:
  - `assignedIds: Set<string>` — initialized from `role.permissions` on open/role change
  - `initialIds: Set<string>` — snapshot of server state, used to detect pending changes
  - `checkedLeft: Set<string>` — checked items in left (available) panel
  - `checkedRight: Set<string>` — checked items in right (assigned) panel
  - `activeResource: string | null` — active tab filter (`null` = "Toutes")
  - `searchLeft: string` — search query for left panel
  - `searchRight: string` — search query for right panel

- [ ] Derived values (via `useMemo`):
  - `resources`: unique sorted list of `resource` values from all permissions
  - `availablePermissions`: `permissions.filter(p => !assignedIds.has(p.id))` → filtered by `activeResource` → filtered by `searchLeft`
  - `assignedPermissions`: `permissions.filter(p => assignedIds.has(p.id))` → filtered by `activeResource` → filtered by `searchRight`
  - `hasPendingChanges`: `initialIds !== assignedIds` (symmetric difference check)

- [ ] Handlers:
  - `handleAssign()`: moves `checkedLeft` items to `assignedIds`, clears `checkedLeft`
  - `handleRemove()`: removes `checkedRight` items from `assignedIds`, clears `checkedRight`
  - `handleSave()`: calls `onSave(Array.from(assignedIds))`
  - `handleCancel()`: resets `assignedIds` to `initialIds`, clears all checked/search state, calls `onCancel()`
  - `handleTabClick(resource)`: sets `activeResource`, clears both search queries and checked states

#### Sub-components (inline within file or extracted)

**PermissionPanel** — renders one side (available or assigned):

```ts
interface IPermissionPanelProps {
    title: string;
    count: number;
    permissions: IPermissionEntity[];
    checkedIds: Set<string>;
    onCheck: (id: string, checked: boolean) => void;
    onCheckAll: (checked: boolean) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    highlight?: boolean;  // for assigned panel count
}
```

- [ ] Header: `Text` with title + `Badge`/`Text` with count
- [ ] `Input` with `prefix={<IconSearchOutlined />}` and `allowClear`
- [ ] `Checkbox.Group` or individual `Checkbox` per permission:
  - `Checkbox` + `Tag color="blue"` showing `{resource}.{action}` + `Text type="secondary"` showing description
- [ ] Empty state: `Empty` component with `"Aucune permission disponible"` / `"Aucune permission assignée"`

### 6. Create `BulkPermissionModal` styles

**File:** `src/modules/roles/presentation/components/ui/BulkPermissionModal/index.module.scss`

- [ ] BEM root: `.bulkPermission`
- [ ] Elements:
  - `&__header` — role info section (avatar, title, status)
  - `&__tabs` — resource filter tabs with `IconFilterOutlined`
  - `&__panels` — `display: flex; gap: dimensions.$padding` for dual columns
  - `&__panel` — individual panel with border, border-radius, overflow-y auto, max-height
  - `&__panelHeader` — title + count
  - `&__item` — permission checkbox row with padding
  - `&__itemTag` — the `resource.action` tag
  - `&__itemDescription` — secondary description text
  - `&__actions` — bottom action buttons row (Assigner/Retirer)
  - `&__footer` — footer with pending changes text
  - `&__transfer` — center transfer buttons (→ ←)
- [ ] Use `dimensions.$padding` for all spacing
- [ ] Use `colors.*` for any custom colors
- [ ] Use `mixins.mediaMaxMD` for responsive stacking on mobile

### 7. Wire into `RolesListContainer`

**File:** `src/modules/roles/presentation/containers/RolesListContainer/index.tsx`

- [ ] Add state: `const [bulkPermissionOpen, setBulkPermissionOpen] = useState(false)`
- [ ] In `handleAction`, add case:
  ```ts
  } else if (action === "managePermissions") {
      rolePermissions.fetchRole(role.id);
      rolePermissions.fetchAllPermissions();
      setBulkPermissionOpen(true);
  }
  ```
- [ ] Add `handleBulkSave(permissionIds: string[])`:
  ```ts
  if (!selectedRole) return;
  await rolePermissions.onBulkUpdate(selectedRole.id, permissionIds);
  setBulkPermissionOpen(false);
  ```
- [ ] Render:
  ```tsx
  {bulkPermissionOpen && (
      <BulkPermissionModal
          open={bulkPermissionOpen}
          loading={rolePermissions.bulkLoading}
          error={rolePermissions.bulkError}
          role={rolePermissions.role}
          permissions={rolePermissions.allPermissions}
          permissionsLoading={rolePermissions.permissionsLoading}
          onSave={handleBulkSave}
          onCancel={() => setBulkPermissionOpen(false)}
      />
  )}
  ```

### 8. Add Icons to centralized module

**File:** `src/shared/presentation/ui/Icons/index.tsx`

- [ ] Add `FilterOutlined` re-export (if not already present) as `IconFilterOutlined`
- [ ] Add `SaveOutlined` re-export as `IconSaveOutlined`
- [ ] Add `ArrowRightOutlined` re-export as `IconArrowRightOutlined`
- [ ] Add `ArrowLeftOutlined` re-export as `IconArrowLeftOutlined`

---

## Files Summary

| File | Action |
|------|--------|
| `components/tables/RolesTable/columns.tsx` | Modify — add `"managePermissions"` to `RoleAction` + dropdown |
| `components/ui/RoleActionModal/index.tsx` | Modify — exclude `"managePermissions"` from config |
| `utils/notification/roles.notification.ts` | Modify — add `bulkUpdatePermissionsSuccess` config |
| `hooks/UseRolePermissions.ts` | Modify — add `bulkLoading`, `bulkError`, `onBulkUpdate` |
| `components/ui/BulkPermissionModal/index.tsx` | Create — full bulk permission management modal |
| `components/ui/BulkPermissionModal/index.module.scss` | Create — BEM styles with shared variables |
| `containers/RolesListContainer/index.tsx` | Modify — wire bulk modal state and handlers |
| `shared/presentation/ui/Icons/index.tsx` | Modify — add missing icon re-exports |

---

## Ant Design Components Used

| Component | Usage |
|-----------|-------|
| `Modal` | Main modal container (custom footer, large width) |
| `Avatar` | Role initial letter in header |
| `Tag` | Role status, resource filter tabs, permission `resource.action` labels |
| `Badge` | Assigned count indicator |
| `Input` | Search fields in each panel (with `prefix` and `allowClear`) |
| `Checkbox` | Individual permission selection |
| `Button` | Assign/Remove/Cancel/Save actions |
| `Typography.Text` | Titles, descriptions, counts, pending changes text |
| `Flex` | Layout for panels, header, footer |
| `Empty` | Empty state when no permissions match filter |
| `Skeleton` | Loading state while fetching permissions |
| `Divider` | Visual separator between sections |

---

## Verification

- [ ] Roles table dropdown shows `"Gérer les permissions"` for active, non-deleted roles
- [ ] Modal opens with role name, status badge, and correct assigned count
- [ ] Resource tabs are generated from all available permissions' unique `resource` values
- [ ] Clicking a tab filters both panels to show only that resource's permissions
- [ ] "Toutes" tab shows all permissions across both panels
- [ ] Search within each panel filters by `resource`, `action`, and `description`
- [ ] Checking items in left panel + clicking "Assigner (N)" moves them to right panel locally
- [ ] Checking items in right panel + clicking "Retirer (N)" moves them to left panel locally
- [ ] `"Modifications en attente de sauvegarde"` text appears when local state differs from server
- [ ] `"Enregistrer"` button is disabled when there are no pending changes
- [ ] Clicking `"Enregistrer"` calls `bulkUpdatePermissionsAction` with all assigned permission IDs
- [ ] Success notification appears and modal closes on successful save
- [ ] Backend errors display via `ErrorAlert` in the modal
- [ ] `"Annuler"` reverts all local changes and closes the modal
- [ ] Empty states display correctly when panels have no matching permissions
- [ ] Modal is responsive — panels stack vertically on tablet/mobile
