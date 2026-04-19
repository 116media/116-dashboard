# Roles & Permissions — Field Specifications

## Roles

### Create/Edit Form Fields

| Field | Label (FR) | Component | Validator Rules | Max Length | Placeholder | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | Nom | `Input` | required, max(20) | 20 | "Nom du rôle" | Unique — backend returns 409 on conflict |
| `description` | Description | `Input.TextArea` | required, max(300) | 300 | "Description du rôle" | `showCount`, `autoSize={{ minRows: 3 }}` |

### Presentation Models

```ts
// Create
interface ICreateRoleCredentials {
    name: string;
    description: string;
}

// Update (partial — only changed fields)
interface IUpdateRoleCredentials {
    name?: string;
    description?: string;
}

// List query
interface IRolesQueryParams {
    pageIndex: number;
    pageSize: number;
    search?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
```

### Table Columns

The table uses `rowSelection={{ type: "checkbox" }}` for row checkboxes (first column, automatic from Ant Design).

| # | Header (FR) | dataIndex | Width | Render | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Nom | `name` | — | Plain text, `Typography.Text` strong | Main identifier |
| 2 | Statut | `isActive` | 100px | `Tag` — `color="success"` "Actif" / `color="warning"` "Inactif" | Colored tags per design |
| 3 | Modifié le | `updatedAt` | 160px | Relative date (e.g. "Auj. 13h23", "Hier 17h16") | Matches design's "Today at 1:23pm" style |
| 4 | Description | `description` | — | `Typography.Text` with `ellipsis={{ tooltip: true }}` | Truncated with tooltip |
| 5 | | — | 48px | `TableActionDropdown` (vertical `⋮`) | No header text, narrow column |

**Status Tag colors** (matching the design):

| State | Tag color | Label |
| --- | --- | --- |
| Active (`isActive && !isDeleted`) | `success` (green) | Actif |
| Inactive (`!isActive && !isDeleted`) | `warning` (orange) | Inactif |
| Deleted (`isDeleted`) | `error` (red) | Supprimé |

**Date formatting**: use relative format matching the design — "Auj. 13h23" for today, "Hier 17h16" for yesterday, "31 mars 2026" for older dates. Use `dayjs` with French locale.

### Action Dropdown Items

| Key | Label (FR) | Icon | Danger | Visible When |
| --- | --- | --- | --- | --- |
| `edit` | Modifier | `EditOutlined` | No | Always |
| `activate` | Activer | `CheckCircleOutlined` | No | `!isActive && !isDeleted` |
| `deactivate` | Désactiver | `StopOutlined` | No | `isActive` |
| `softDelete` | Supprimer | `DeleteOutlined` | Yes | `!isDeleted` |
| `restore` | Restaurer | `UndoOutlined` | No | `isDeleted` |
| `hardDelete` | Supprimer définitivement | `DeleteOutlined` | Yes | `isDeleted` |

All mutation items are hidden for Admin users (only SuperAdmin can see them). Use `useIsSuperAdmin()` hook.

---

## Permissions

### Create/Edit Form Fields

| Field | Label (FR) | Component | Validator Rules | Max Length | Placeholder | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `resource` | Ressource | `Input` | required, max(15) | 15 | "ex: users, articles" | Part of compound unique key |
| `action` | Action | `Input` | required, max(15) | 15 | "ex: create, read, delete" | Part of compound unique key |
| `description` | Description | `Input.TextArea` | required, max(300) | 300 | "Description de la permission" | `showCount`, `autoSize={{ minRows: 3 }}` |

### Presentation Models

```ts
// Create
interface ICreatePermissionCredentials {
    resource: string;
    action: string;
    description: string;
}

// Update (partial)
interface IUpdatePermissionCredentials {
    resource?: string;
    action?: string;
    description?: string;
}

// List query
interface IPermissionsQueryParams {
    pageIndex: number;
    pageSize: number;
    search?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
```

### Table Columns

Same design as roles table — checkbox selection, clean rows, `⋮` action column.

| # | Header (FR) | dataIndex | Width | Render | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Ressource | `resource` | 120px | `Tag` color="blue" | Compound unique with Action |
| 2 | Action | `action` | 120px | `Tag` color="geekblue" | Compound unique with Resource |
| 3 | Statut | `isActive` | 100px | `Tag` — `color="success"` / `color="warning"` | Same colors as roles |
| 4 | Modifié le | `updatedAt` | 160px | Relative date (same format as roles) | |
| 5 | Description | `description` | — | `Typography.Text` with `ellipsis={{ tooltip: true }}` | Fills remaining space |
| 6 | | — | 48px | `TableActionDropdown` (vertical `⋮`) | |

### Action Dropdown Items

Same structure as roles: edit, activate, deactivate, softDelete, restore, hardDelete — with same visibility conditions and SuperAdmin gating.

---

## Validation Rules (Backend Reference)

These rules mirror the backend's FluentValidation configuration:

### Role Validation

| Field | Rule | Error Message (backend) |
| --- | --- | --- |
| Name | NotEmpty | "Name is required." |
| Name | MaxLength(20) | "Name must not exceed 20 characters." |
| Description | NotEmpty | "Description is required." |
| Description | MaxLength(300) | "Description must not exceed 300 characters." |

### Permission Validation

| Field | Rule | Error Message (backend) |
| --- | --- | --- |
| Resource | NotEmpty | "Resource is required." |
| Resource | MaxLength(15) | "Resource must not exceed 15 characters." |
| Action | NotEmpty | "Action is required." |
| Action | MaxLength(15) | "Action must not exceed 15 characters." |
| Description | NotEmpty | "Description is required." |
| Description | MaxLength(300) | "Description must not exceed 300 characters." |

### Client-Side Validators

```ts
// File: src/modules/roles/presentation/utils/validators/roles.validator.ts

export const RolesValidator = {
    name: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 20)
    ],
    description: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 300)
    ]
} as const;
```

```ts
// File: src/modules/permissions/presentation/utils/validators/permissions.validator.ts

export const PermissionsValidator = {
    resource: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 15)
    ],
    action: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 15)
    ],
    description: (label: string): Rule[] => [
        ValidatorUtils.required(label),
        ValidatorUtils.max(label, 300)
    ]
} as const;
```

---

## Pagination Defaults

| Parameter | Default | Notes |
| --- | --- | --- |
| `pageSize` | 10 | Ant Design Table `pageSizeOptions: [10, 20, 50]` |
| `pageIndex` | 0 | First page |
| `showSizeChanger` | false | Page size selector is hidden |

---

## Role-Permission Association (Phase 4)

### Permission Picker (Transfer)

| Panel | Data Source | Display |
| --- | --- | --- |
| Left (available) | All permissions (`getAllPermissionsAction`) | `${resource}:${action}` — grouped by resource |
| Right (assigned) | Current role's permissions (`getRoleByIdAction`) | Same display format |

**Save action:** Calls `bulkUpdatePermissions` with the array of selected permission IDs.

**Grouping:** Permissions are visually grouped by `resource` in the Transfer component's custom render function. Each group header shows the resource name, and items within show the action and description.
