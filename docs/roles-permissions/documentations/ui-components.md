# Roles & Permissions — UI Components

## Overview

This module introduces several **shared CRUD components** (reusable across any future module) plus module-specific components for roles and permissions tables, forms, and action modals.

The shared components are inspired by the kinix_dashboard's proven CRUD patterns (`TableTitle`, `TableSearchInput`, `TableStatusFilter`, `CreateModalHeader`, `FormSuccessResult`, action modals) but adapted to the 116 dashboard's architecture (typed props, Ant Design 6, Clean Architecture, `Failure` error types).

---

## JSDoc Standard

Every exported symbol (interface, class, component, hook, type, function, constant) **must** have JSDoc documentation following the patterns already established in the codebase. Below are the exact templates for each kind of symbol.

### Interfaces (domain entities, props, ports)

```ts
/**
 * Full CRUD role entity mapped from RoleDto.
 *
 * @interface IRoleEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} name - Role name (max 20 chars, unique)
 * @property {string} description - Role description (max 300 chars)
 * @property {boolean} isActive - Whether the role is currently active
 * @property {boolean} isDeleted - Whether the role has been soft-deleted
 * @property {string | null} deletedAt - ISO 8601 deletion timestamp
 */
export interface IRoleEntity { ... }
```

### Props interfaces (components)

```ts
/**
 * Props for the PageHeader component.
 *
 * @interface IPageHeaderProps
 * @property {string} title - Page title displayed as heading
 * @property {string} [subtitle] - Muted description below the title
 * @property {ReactNode} [icon] - Optional icon displayed next to the title
 * @property {() => void} [onCreate] - Opens the create modal (hidden for non-SuperAdmin)
 * @property {string} [createLabel] - Create button label (default: "Créer")
 * @property {ReactNode} [extra] - Additional action buttons
 */
export interface IPageHeaderProps { ... }
```

### Repository port methods

```ts
export interface IRolesRepositoryPort {
    /**
     * Fetches a paginated list of roles with optional search and status filters.
     *
     * @param {IRolesQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IRolePaginatedResult>>} `ok(IRolePaginatedResult)` on success, `err(Failure)` on failure
     */
    getAll(params: IRolesQueryParams): Promise<Result<IRolePaginatedResult>>;

    /**
     * Fetches a single role by ID, including its assigned permissions.
     *
     * @param {string} id - Role UUID
     * @returns {Promise<Result<IRoleWithPermissions>>} `ok(IRoleWithPermissions)` on success, `err(Failure)` on failure
     */
    getById(id: string): Promise<Result<IRoleWithPermissions>>;
}
```

### Use case classes

```ts
/**
 * @interface IGetAllRolesUseCase
 * @extends {IResultUseCase<IRolesQueryParams, IRolePaginatedResult>}
 */
interface IGetAllRolesUseCase extends IResultUseCase<IRolesQueryParams, IRolePaginatedResult> {}

/**
 * Use case for fetching a paginated list of roles.
 *
 * @class GetAllRolesUseCase
 * @implements {IGetAllRolesUseCase}
 *
 * @description
 * Delegates to the roles repository. Supports server-side
 * pagination, search, and status filtering.
 */
export class GetAllRolesUseCase implements IGetAllRolesUseCase {
    private readonly rolesRepository: IRolesRepositoryPort;

    /**
     * @param {IRolesRepositoryPort} rolesRepository - Repository for role operations (injected)
     */
    constructor({ rolesRepository }: { rolesRepository: IRolesRepositoryPort }) { ... }

    /**
     * Executes the get all roles use case.
     *
     * @param {IRolesQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IRolePaginatedResult>>} `ok(IRolePaginatedResult)` on success, `err(Failure)` on failure
     */
    async execute(params: IRolesQueryParams): Promise<Result<IRolePaginatedResult>> { ... }
}
```

### React components (FC)

```ts
/**
 * Page header with title, subtitle, and optional create button.
 *
 * @component
 *
 * @description
 * Renders the page header matching the dashboard table design.
 * The create button is only rendered when `onCreate` is provided
 * (hidden for non-SuperAdmin users).
 *
 * @param {IPageHeaderProps} props - Component props
 * @returns {JSX.Element} The page header
 */
const PageHeader: FC<IPageHeaderProps> = ({ title, subtitle, onCreate, ... }) => { ... };
```

### Custom hooks

```ts
/**
 * Custom hook for managing the roles paginated list.
 *
 * @description
 * Manages pagination, search, and status filter state.
 * Dispatches `getAllRolesAction` when parameters change.
 * Converts between Ant Design's 1-based pagination and the API's
 * 0-based `pageIndex`.
 *
 * @returns Roles list data, loading/error state, filter controls, and reload function
 * @returns {IRolePaginatedResult} roles - Paginated roles data
 * @returns {boolean} loading - Whether the list is loading
 * @returns {Failure | null} error - Fetch error if any
 * @returns {RoleStatusFilter} statusFilter - Current status filter
 * @returns {string} searchValue - Current search input value
 * @returns {Function} onSearch - Triggers search with current value
 * @returns {Function} onPageChange - Handles page/size change
 * @returns {Function} reload - Re-fetches with current params
 */
export const useRolesList = (): IUseRolesList => { ... };
```

### Mappers (const objects)

```ts
/**
 * Maps role DTOs from the generated API to domain entities.
 *
 * @description
 * All DTO-to-entity conversion is centralized here. Presentation
 * and domain layers never see raw DTOs.
 */
export const RolesMapper = {
    /**
     * Maps a single RoleDto to an IRoleEntity domain entity.
     *
     * @param {RoleDto} dto - The raw DTO from the API response
     * @returns {IRoleEntity} The mapped domain entity
     */
    roleFromDto(dto: RoleDto): IRoleEntity { ... },
};
```

### Types and generics

```ts
/**
 * Generic status option for table filter dropdowns.
 *
 * @interface IStatusOption
 * @template T - The status value type (defined per module)
 *
 * @property {T} value - The status value sent to the filter handler
 * @property {string} label - French display label
 */
export interface IStatusOption<T extends string = string> {
    value: T;
    label: string;
}
```

### Constants and notification configs

```ts
/**
 * Success notification configurations for role operations.
 *
 * @description
 * Only success messages are declared here. Error notifications
 * are built at call time from the backend's `Failure.title` /
 * `Failure.detail` — never hardcoded.
 */
export const RolesNotification = { ... } as const;
```

### What NOT to document

- Private/internal helper functions that are only used within a single file
- Import statements
- Single-line type aliases that are self-explanatory (e.g. `type RolesStateKey = keyof IRolesState`)
- Enum values (the enum itself gets a JSDoc, not each value)

---

## Styling Guidelines

All components in this module **must** follow these rules:

### Ant Design First

- **Always prefer Ant Design components** (`Button`, `Tag`, `Typography`, `Flex`, `Row`, `Col`, `Space`, `Skeleton`, etc.) over custom HTML elements with heavy SCSS.
- Layout should use Ant Design's `Flex`, `Row`/`Col`, or `Space` — not manual flexbox in SCSS.
- Use `Typography.Title`, `Typography.Text`, `Typography.Paragraph` for all text — not raw `<h1>`-`<h6>`, `<span>`, or `<p>` with custom styles.
- Use `Tag` for status badges, `Button` for actions, `Dropdown` for menus, `Modal` for dialogs, `Table` for data — do not reinvent these.

### SCSS Module Rules

1. **One main BEM block class per `index.module.scss`** — the block name matches the component folder name in camelCase:

   ```scss
   // ✅ Good — RolesListContainer/index.module.scss
   .rolesListContainer {
       &__header { ... }
       &__filters { ... }
       &__table { ... }
   }

   // ❌ Bad — multiple root classes
   .header { ... }
   .filters { ... }
   ```

2. **BEM notation** — use `block__element` with the `&__` nesting pattern. Modifiers use `&--modifier`:

   ```scss
   .roleForm {
       &__field { ... }
       &__actions { ... }
       &__actions--centered { ... }
   }
   ```

3. **No hardcoded colors** — always import and use shared color variables:

   ```scss
   @use "@/shared/presentation/styles/colors" as colors;
   @use "@/shared/presentation/styles/dimensions" as dimensions;

   .myComponent {
       color: colors.$text-primary;           // ✅
       background: colors.$background;        // ✅
       padding: dimensions.$padding;          // ✅
       border-radius: dimensions.$border-radius; // ✅

       color: #111827;                        // ❌ hardcoded
       padding: 24px;                         // ❌ hardcoded
   }
   ```

4. **Shared style files** — import from `@/shared/presentation/styles/`:
   - `colors.scss` — brand, theme, neutral, text colors
   - `dimensions.scss` — `$padding`, `$border-radius`, breakpoints, `$header-height`
   - `mixins.scss` — responsive breakpoints (`@include mediaMaxMD`), `cardContentPadding`, `preventTextSelection`

5. **Minimal SCSS** — if a layout can be achieved with Ant Design's `Flex`, `Row`/`Col`, or `Space` components, do not write SCSS for it. SCSS is for spacing, gaps, and edge cases that Ant Design doesn't cover.

6. **Ant Design class overrides** — when necessary, target Ant Design classes with the `[class~="ant-xxx"]` selector pattern:

   ```scss
   .myComponent {
       [class~="ant-skeleton-title"] {
           margin: 0 !important;
       }
   }
   ```

### Example

A well-structured component SCSS file:

```scss
// RolesListContainer/index.module.scss
@use "@/shared/presentation/styles/colors" as colors;
@use "@/shared/presentation/styles/dimensions" as dimensions;

.rolesListContainer {
    &__filters {
        display: flex;
        align-items: center;
        gap: dimensions.$padding;
        margin-bottom: dimensions.$padding;
    }

    &__empty {
        padding: calc(dimensions.$padding * 2) 0;
    }
}
```

---

## Design Reference

The table pages follow this layout (from [dashboard.table.jpg](../implementation/specs/assets/dashboard.table.jpg)):

```
┌────────────────────────────────────────────────────────────────────┐
│  🏠 > Rôles > Vue d'ensemble                                       │  ← Breadcrumbs
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Rôles                                          [+ Créer un rôle]  │  ← Page header
│  Gérer les rôles et les accès.                                     │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  [Tous ▾]                                  [🔍 Search...] │  │  ← Toolbar
│  │                                                              │  │
│  │  ☐  Nom           Statut    Modifié le     Description    ⋮ │  │  ← Table header
│  │  ─────────────────────────────────────────────────────────── │  │
│  │  ☐  Admin         Active    Auj. 13h23     Lorem ipsum    ⋮ │  │  ← Rows
│  │  ☐  SuperAdmin    Active    Auj. 15h50     Lorem ipsum    ⋮ │  │
│  │  ☐  Visitor       Inactive  Auj. 10h32     Lorem ipsum    ⋮ │  │
│  │  ...                                                         │  │
│  │                                                              │  │
│  │  ← Précédent   1  2  3 ... 8  9  10        Suivant →       │  │  ← Pagination
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

Key visual details from the design:

- **Breadcrumbs** in the Navbar: `Home icon > Section > Sub-page` with `>` separators
- **Page header**: large title + muted subtitle on the left, primary action button (green) on the right
- **Toolbar row**: status `Select` dropdown on the left, search `Input` on the right
- **Table**: clean rows with checkbox selection, status as colored `Tag` (green "Active", orange "Draft", gray "Archived"), vertical three-dot `⋮` menu as last column
- **Pagination**: `← Précédent` / numbered pages with ellipsis / `Suivant →` style — no "total items" text
- **No card wrapper** around the table — sits directly on the content background

---

## Breadcrumbs

The Navbar already has a `Breadcrumb` at `src/shared/presentation/layouts/DashboardLayout/Navbar/index.tsx`. Currently it shows `Home > Page label`. For CRUD pages, it needs to support sub-levels matching the design:

```
🏠 > Rôles > Vue d'ensemble    (list page)
🏠 > Permissions > Vue d'ensemble
```

The breadcrumb derives its items from `NAVIGATION_ITEMS` using `location.pathname`. A third "Vue d'ensemble" crumb should be appended for list pages. This can be handled by extending the Navbar's breadcrumb logic or by allowing pages to pass custom breadcrumb items.

---

## Shared CRUD Components (Phase 1)

All located under `src/shared/presentation/ui/`.

### PageHeader

Page title section with subtitle and action buttons (matches the design's header area).

```tsx
interface IPageHeaderProps {
    title: string;              // e.g. "Rôles"
    subtitle?: string;          // e.g. "Gérer les rôles et les accès."
    icon?: ReactNode;           // optional icon displayed next to the title
    onCreate?: () => void;      // opens create modal
    createLabel?: string;       // default: "Créer"
    extra?: ReactNode;          // additional action buttons
}
```

**Layout (matching the design):**

```
┌──────────────────────────────────────────────────────┐
│  Rôles                               [+ Créer un rôle]│
│  Gérer les rôles et les accès.                        │
└──────────────────────────────────────────────────────┘
```

- Uses Ant Design `Typography.Title` level 4 for the title
- Uses `Typography.Paragraph` type="secondary" for the subtitle
- Create button: `Button` type="primary" with `PlusOutlined` icon
- If `onCreate` is undefined, the create button is not rendered (Admin users)
- Layout: Ant Design `Flex` with `justify="space-between"` — no custom SCSS for this

### TableSearchInput

Controlled search input with Enter-to-search.

```tsx
interface ITableSearchInputProps {
    value: string;              // controlled value
    loading?: boolean;          // spinner on search icon
    onChange: (value: string) => void;
    onSearch: (value: string) => void;  // triggered on Enter
    placeholder?: string;       // default: "Rechercher..."
}
```

- Uses Ant Design `Input` with `SearchOutlined` prefix
- `allowClear` enabled
- `onPressEnter` triggers `onSearch`
- Clearing input also triggers `onSearch("")` to reset results

### TableStatusFilter

**Generic** dropdown select for filtering by any status type (matches the design's "All Status" dropdown with chevron).

The component is **not coupled to specific status values** — each module defines its own status options and labels. Videos might have "published" / "draft" / "archived", articles might have "pending" / "approved" / "rejected", roles have "active" / "inactive" / "deleted".

```tsx
interface IStatusOption<T extends string = string> {
    value: T;
    label: string;
}

interface ITableStatusFilterProps<T extends string = string> {
    value: T;
    onChange: (value: T) => void;
    options: IStatusOption<T>[];
    loading?: boolean;
}
```

- Uses Ant Design `Select` component (matching the design's dropdown style)
- `FilterOutlined` icon is embedded as the `prefix` inside the Select
- **No hardcoded statuses** — the `options` array is required and provided by the consumer
- Fixed width (~140px) via `style={{ width: 140 }}`

**Example usage for roles:**

```tsx
// Defined in the roles module, not shared
const ROLE_STATUS_OPTIONS: IStatusOption<RoleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "active", label: "Actifs" },
    { value: "inactive", label: "Inactifs" },
    { value: "deleted", label: "Supprimés" }
];

<TableStatusFilter
    value={statusFilter}
    onChange={onStatusFilterChange}
    options={ROLE_STATUS_OPTIONS}
/>
```

**Example usage for articles (different statuses):**

```tsx
const ARTICLE_STATUS_OPTIONS: IStatusOption<ArticleStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: "pending", label: "En attente" },
    { value: "approved", label: "Approuvés" },
    { value: "rejected", label: "Rejetés" }
];
```

### TableToolbar

Toolbar row containing the filter button, status dropdown, and search input (matches the design's filter bar). Also generic — it receives the status filter props without knowing the status type.

```tsx
interface ITableToolbarProps<T extends string = string> {
    statusFilter: T;
    onStatusFilterChange: (value: T) => void;
    statusOptions: IStatusOption<T>[];
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: (value: string) => void;
    searchLoading?: boolean;
}
```

**Layout (matching the design):**

```
┌──────────────────────────────────────────────────────────┐
│  [Tous ▾]                                 [🔍 Search...] │
└──────────────────────────────────────────────────────────┘
```

- Left side: `TableStatusFilter` (Select dropdown)
- Right side: `TableSearchInput`
- Layout: Ant Design `Flex` with `justify="space-between"` and `align="center"`
- All in a single row — no custom SCSS needed, just spacing via `gap`

**Status → query params mapping** is done in the **module's hook**, not in the shared component. Each module maps its own status values to the API query params it needs. For roles:

| RoleStatusFilter | isActive | isDeleted |
| --- | --- | --- |
| `"all"` | undefined | `false` |
| `"active"` | `true` | `false` |
| `"inactive"` | `false` | `false` |
| `"deleted"` | undefined | `true` |

### CreateEditModal

Modal that switches between create and edit modes.

```tsx
type FormContext = "CREATE" | "EDIT";

interface ICreateEditModalProps {
    open: boolean;
    loading: boolean;
    formContext: FormContext;
    success: string | null;       // success message, or null
    onClose: () => void;
    onSubmit: () => void;         // triggers form.submit()
    title: { create: string; edit: string };
    width?: number;               // default: 590
    children: ReactNode;          // form content
    onSuccessClose: () => void;   // close after success
}
```

**Behavior:**
- When `success` is truthy, renders `FormSuccessResult` instead of children
- Header shows context-appropriate title (create or edit)
- Footer has submit + cancel buttons (passed via `footer` prop)
- `closable={!success}` — close icon is hidden while success screen is shown
- `onCancel={onClose}` is passed to handle modal dismiss
- `destroyOnHidden` ensures form state resets
- `centered` positioning

**Layout:**

```
┌───────────────────────────────────────────┐
│  Créer un rôle              [Annuler] [✓] │
│───────────────────────────────────────────│
│                                           │
│  [Form children rendered here]            │
│                                           │
│  [ErrorAlert — if error in form state]    │
│                                           │
└───────────────────────────────────────────┘
```

Or on success:

```
┌───────────────────────────────────────────┐
│                                           │
│           ✅ Success icon                 │
│     "Le rôle a été créé avec succès"      │
│                                           │
│             [Fermer]                       │
│                                           │
└───────────────────────────────────────────┘
```

### FormSuccessResult

Success state displayed after a form submission.

```tsx
interface IFormSuccessResultProps {
    title: string;              // e.g. "Le rôle a été créé avec succès"
    subtitle?: string;
    onClose: () => void;
    closeLabel?: string;        // default: "Fermer"
}
```

Uses Ant Design `Result` with `status="success"` and a centered close button.

### ActionModal

Confirmation modal for status-change and delete actions.

```tsx
interface IActionModalProps {
    open: boolean;
    loading: boolean;
    title: string;             // e.g. "Désactiver le rôle"
    description?: string;      // e.g. "Êtes-vous sûr ?"
    danger?: boolean;          // red confirm button
    confirmLabel?: string;     // default: "Confirmer"
    error: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
}
```

**Behavior:**
- Renders `ErrorAlert` above the confirm/cancel buttons when error is present
- `danger` prop makes the confirm button red (for delete operations)
- `loading` disables the confirm button and shows a spinner

### TableActionDropdown

Dropdown menu for table row actions.

```tsx
interface ITableActionItem {
    key: string;
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    onClick: () => void;
    hidden?: boolean;       // conditionally hide items
}

interface ITableActionDropdownProps {
    items: ITableActionItem[];
}
```

- Uses Ant Design `Dropdown` with `menu={{ items }}` prop
- Trigger button: `Button` type="text" with `MoreOutlined` icon
- Items with `hidden: true` are filtered out before rendering
- Items with `danger: true` render in red

---

## Module-Specific Components

### RoleForm / PermissionForm

Single form component used for both create and edit modes.

**RoleForm props:**

```tsx
interface IRoleFormProps {
    form: FormInstance<ICreateRoleCredentials>;
    error: Failure | null | undefined;
    formContext: FormContext;
    initialValues?: IRoleEntity;
}
```

**RoleForm fields:**

| Field | Component | Validator | Max |
| --- | --- | --- | --- |
| Nom | `Input` | required, max 20 | 20 |
| Description | `Input.TextArea` showCount | required, max 300 | 300 |

**PermissionForm fields:**

| Field | Component | Validator | Max |
| --- | --- | --- | --- |
| Ressource | `Input` | required, max 15 | 15 |
| Action | `Input` | required, max 15 | 15 |
| Description | `Input.TextArea` showCount | required, max 300 | 300 |

Both forms render `ErrorAlert` at the top for inline error display.

### RolesTable / PermissionsTable

See [Field Specifications](./field-specifications.md) for detailed column definitions.

### RoleActionModal / PermissionActionModal

Wrappers around the shared `ActionModal` that map action types to French titles and descriptions:

```ts
type RoleActionType = "activate" | "deactivate" | "softDelete" | "hardDelete" | "restore";

const ACTION_CONFIG: Record<RoleActionType, { title: string; description: string; danger: boolean }> = {
    activate: {
        title: "Activer le rôle",
        description: "Êtes-vous sûr de vouloir activer ce rôle ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le rôle",
        description: "Les utilisateurs avec ce rôle perdront les permissions associées.",
        danger: false
    },
    softDelete: {
        title: "Supprimer le rôle",
        description: "Le rôle sera désactivé et marqué comme supprimé. Cette action est réversible.",
        danger: true
    },
    hardDelete: {
        title: "Supprimer définitivement",
        description: "Cette action est irréversible. Le rôle et toutes ses associations seront supprimés.",
        danger: true
    },
    restore: {
        title: "Restaurer le rôle",
        description: "Le rôle sera restauré et pourra être réactivé.",
        danger: false
    }
};
```

### PermissionPicker (Phase 4)

Ant Design `Transfer` component for managing role-permission associations:

- Left panel: all available permissions (fetched from permissions module)
- Right panel: currently assigned permissions
- Groups by `resource` for better navigation
- Save button triggers `bulkUpdatePermissions` API call

---

## Error Display Patterns

This module follows the three canonical error patterns established in the settings module. See [Settings UI Components — Error Display Pattern](../../settings/documentations/ui-components.md#error-display-pattern).

| Context | Pattern | Example |
| --- | --- | --- |
| List fetch error | `<ErrorAlert onClose={reload} />` with retry | Roles list fails to load |
| Form submission error | `<ErrorAlert error={error} />` inline in form | Create role returns 409 conflict |
| Action mutation error | `showNotification({ title, detail })` toast | Activate fails (already active) |

**Rule:** Error messages always come from `Failure.title` / `Failure.detail` — never hardcoded.

---

## Hooks

### List Hook Pattern

```ts
// RoleStatusFilter is defined in the roles module, not shared
type RoleStatusFilter = "all" | "active" | "inactive" | "deleted";

interface IUseRolesList {
    loading: boolean;
    error: Failure | null | undefined;
    roles: IRolePaginatedResult;
    statusFilter: RoleStatusFilter;
    searchValue: string;
    onSearch: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: RoleStatusFilter) => void;
    onPageChange: (page: number, pageSize: number) => void;
    reload: () => void;
}
```

The hook uses `useEffect` to dispatch `getAllRolesAction` when pagination/filter params change. It manages local state for `searchValue` and `statusFilter`, and derives the API query params from them.

**Pagination conversion:**
- Ant Design `current` (1-based) → API `pageIndex` (0-based): `pageIndex = current - 1`
- API `count` → Ant Design `total`: `total = count`

### Create/Edit Hook Pattern

```ts
interface IUseCreateRole {
    form: FormInstance<ICreateRoleCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateRoleCredentials) => Promise<void>;
    resetCreate: () => void;
}
```

On success: sets `success` message string, shows toast notification, resets form. On rejection: error flows into Redux state → `ErrorAlert` renders it inline in the form.

### Action Hook Pattern

```ts
interface IUseRoleActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    onSoftDelete: (id: string) => Promise<void>;
    onHardDelete: (id: string) => Promise<void>;
    onRestore: (id: string) => Promise<void>;
    resetActions: () => void;
}
```

Each action dispatches its thunk, shows a success notification on fulfilled, and shows a toast with `result.payload.title`/`detail` on rejection. After success, calls `reload()` to refresh the table.

---

## Notification Configs (Success Only)

```ts
// File: src/modules/roles/presentation/utils/notification/roles.notification.ts

export const RolesNotification = {
    createSuccess: {
        type: "success",
        title: "Rôle créé",
        description: "Le rôle a été créé avec succès."
    } as INotificationConfig,

    updateSuccess: {
        type: "success",
        title: "Rôle modifié",
        description: "Le rôle a été modifié avec succès."
    } as INotificationConfig,

    activateSuccess: {
        type: "success",
        title: "Rôle activé",
        description: "Le rôle a été activé avec succès."
    } as INotificationConfig,

    deactivateSuccess: {
        type: "success",
        title: "Rôle désactivé",
        description: "Le rôle a été désactivé avec succès."
    } as INotificationConfig,

    softDeleteSuccess: {
        type: "success",
        title: "Rôle supprimé",
        description: "Le rôle a été supprimé avec succès."
    } as INotificationConfig,

    hardDeleteSuccess: {
        type: "success",
        title: "Rôle supprimé définitivement",
        description: "Le rôle a été supprimé de manière permanente."
    } as INotificationConfig,

    restoreSuccess: {
        type: "success",
        title: "Rôle restauré",
        description: "Le rôle a été restauré avec succès."
    } as INotificationConfig
} as const;
```

Error notifications are built at call time from the backend's `Failure` — see [Error Display Patterns](#error-display-patterns).
