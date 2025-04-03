# Phase 1: Shared CRUD Components

Reusable components for table pages, modals, and filters. Built once, used by roles, permissions, and any future CRUD module.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [field-specifications.md](../../documentations/field-specifications.md)

**Pattern reference**: kinix_dashboard's `TableTitle`, `TableSearchInput`, `TableStatusFilter`, `FormSuccessResult`, `CreateModalHeader`

> **Styling rules** — see [ui-components.md — Styling Guidelines](../../documentations/ui-components.md#styling-guidelines). Key points:
>
> - Prefer Ant Design components (`Flex`, `Row`/`Col`, `Space`, `Typography`, `Button`, `Tag`) over custom HTML+SCSS
> - One BEM block per `index.module.scss`, named in camelCase matching the folder
> - Never hardcode colors — use `@use "@/shared/presentation/styles/colors" as colors`
> - Use shared `dimensions.scss` for `$padding`, `$border-radius`, breakpoints
> - Use shared `mixins.scss` for responsive breakpoints
> - Minimal SCSS — only for spacing and edge cases that Ant Design can't handle

---

## `src/shared/domain/types/pagination.ts`

- [ ] Export `FormContext` type: `"CREATE" | "EDIT"`
- [ ] Export `IStatusOption<T>` interface: `{ value: T; label: string }` — generic status option for any filter
- [ ] Export `IPaginationParams` interface: `pageIndex` (0-based), `pageSize`, `search?` — no status fields (those are module-specific)
- [ ] Export `IPaginatedResult<T>` interface: `items: T[]`, `pageIndex`, `pageSize`, `count`
- [ ] Add JSDoc on each type explaining the API conventions (0-based index, count = total records)
- [ ] Note: **no `StatusFilterValue` type here** — each module defines its own status union type (e.g. `RoleStatusFilter`, `ArticleStatusFilter`). The shared layer only provides the generic `IStatusOption<T>` shape.

---

## `src/shared/presentation/ui/PageHeader/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `IPageHeaderProps`: `title`, `subtitle?`, `icon?: ReactNode`, `onCreate?`, `createLabel?` (default "Créer"), `extra?`
- [ ] Render `Flex` with `justify="space-between"`:
  - Left: `Typography.Title` level 4 for title + `Typography.Paragraph` type="secondary" for subtitle
  - Right: `Button` type="primary" with `PlusOutlined` icon when `onCreate` is provided
- [ ] If `onCreate` is undefined, the create button is not rendered (Admin users)
- [ ] SCSS: bottom margin only — layout is Ant Design `Flex`

---

## `src/shared/presentation/ui/TableSearchInput/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `ITableSearchInputProps`: `value`, `loading?`, `onChange`, `onSearch`, `placeholder?` (default "Search....")
- [ ] Use Ant Design `Input` with `SearchOutlined` prefix and `allowClear`
- [ ] `onPressEnter` triggers `onSearch(value)`
- [ ] `onClear` triggers `onSearch("")` to reset results
- [ ] Controlled component: parent manages value via `onChange`
- [ ] Match the design: rounded input, right-aligned, placeholder "Search...."
- [ ] SCSS: fixed width (~240px)

---

## `src/shared/presentation/ui/TableStatusFilter/`

**Files**: `index.tsx` (no SCSS needed — uses Ant Design `Select`)

- [ ] Make the component **generic** — it receives `IStatusOption<T>[]`, not hardcoded status values
- [ ] Define `ITableStatusFilterProps<T extends string>`: `value: T`, `onChange: (value: T) => void`, `options: IStatusOption<T>[]`, `loading?: boolean`
- [ ] Use Ant Design `Select` component (matching the design's dropdown with chevron)
- [ ] Map `options` to `Select.Option` items using `option.value` and `option.label`
- [ ] **No hardcoded statuses or labels** — the consumer provides everything via the `options` array
- [ ] Fixed width (~140px) via `style={{ width: 140 }}`

---

## `src/shared/presentation/ui/TableToolbar/`

**Files**: `index.tsx` + `index.module.scss`

Toolbar row matching the design's filter bar: `[Status dropdown] ... [Search input]`

- [ ] Make the component **generic** over the status type: `ITableToolbarProps<T extends string>`
- [ ] Props: `statusFilter: T`, `onStatusFilterChange: (value: T) => void`, `statusOptions: IStatusOption<T>[]`, `searchValue`, `onSearchChange`, `onSearch`, `searchLoading?`
- [ ] Left side: `TableStatusFilter` only
- [ ] Right side: `TableSearchInput`
- [ ] Layout: Ant Design `Flex` with `justify="space-between"` and `align="center"`
- [ ] Left group: `Flex` with `gap={8}` for status dropdown
- [ ] SCSS: bottom margin only, use `dimensions.$padding` for spacing

---

## `src/shared/presentation/ui/FormSuccessResult/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `IFormSuccessResultProps`: `title`, `subtitle?`, `onClose`, `closeLabel?` (default "Fermer")
- [ ] Use Ant Design `Result` with `status="success"`
- [ ] Close button: `Button` type="primary" below the result
- [ ] SCSS: centered layout, padding

---

## `src/shared/presentation/ui/CreateEditModal/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `ICreateEditModalProps`: `open`, `loading`, `formContext: FormContext`, `success: string | null`, `onClose`, `onSubmit`, `title: { create: string; edit: string }`, `width?` (590), `children`, `onSuccessClose`
- [ ] When `success` is truthy: render `FormSuccessResult` with `onClose={onSuccessClose}`
- [ ] When `success` is falsy: render `children` (the form)
- [ ] Modal `title`: render the title text from `title.create` or `title.edit` based on `formContext`
- [ ] Modal `footer`: render Cancel button (text) → `onClose` and Submit button (primary, loading) → `onSubmit`
- [ ] Modal props: `destroyOnHidden`, `centered`, `closable={!success}`, `onCancel={onClose}`
- [ ] SCSS: footer flex layout, button spacing

---

## `src/shared/presentation/ui/ActionModal/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define `IActionModalProps`: `open`, `loading`, `title`, `description?`, `danger?`, `confirmLabel?` (default "Confirmer"), `error: Failure | null | undefined`, `onConfirm`, `onCancel`
- [ ] Use Ant Design `Modal` with `centered`, `footer={null}`
- [ ] Render `ErrorAlert` at top when `error` is present (error title/detail from backend)
- [ ] Render description as `Typography.Paragraph`
- [ ] Custom footer row: Cancel button + Confirm button (danger when `danger` prop is true, loading when `loading`)
- [ ] Import `Failure` from `@/shared/domain/failures/failure`
- [ ] SCSS: footer flex layout

---

## `src/shared/presentation/ui/TableActionDropdown/`

**File**: `index.tsx` (no SCSS needed)

- [ ] Define `ITableActionItem`: `key`, `label`, `icon?`, `danger?`, `onClick`, `hidden?`
- [ ] Define `ITableActionDropdownProps`: `items: ITableActionItem[]`
- [ ] Filter out items where `hidden === true`
- [ ] Map to Ant Design `Dropdown` menu items format
- [ ] Trigger button: vertical three-dot `⋮` icon — use `Button` type="text" with `EllipsisOutlined` rotated 90° or `MoreOutlined` (matching the design's vertical dots in the last column)
- [ ] Danger items rendered with `danger: true` in the menu item config

---

## Table Design Notes (from the design reference)

The Ant Design `<Table>` must be configured to match the design:

- [ ] **Row selection**: `rowSelection={{ type: "checkbox" }}` — checkboxes on the left of each row
- [ ] **Clean header**: no background color on header row — use Ant Design's borderless/clean theme or override with SCSS
- [ ] **Status column**: render as Ant Design `Tag` with colors:
  - Active → `color="success"` (green)
  - Inactive → `color="warning"` (orange)
  - Deleted → `color="error"` (red)
  - Archived/Draft → `color="default"` (gray)
- [ ] **Action column**: last column, narrow, renders `TableActionDropdown` (vertical three-dot `⋮`)
- [ ] **Pagination**: Ant Design `Table` pagination with:
  - `showSizeChanger: false` (matches the design — no page size selector visible)
  - `itemRender`: custom render for Prev/Next to show `← Précédent` / `Suivant →` text
  - Numbered page buttons with ellipsis (Ant Design default)
  - No `showTotal` (the design doesn't show "X rôle(s)" in the pagination bar)
- [ ] **No card wrapper**: the table sits directly on the page content area, not inside a `Card`

---

## Verification

- [ ] `npm run build` passes with all new components
- [ ] Each component can be imported from its index file
- [ ] `PageHeader` renders title, subtitle, and create button
- [ ] `TableToolbar` renders status dropdown on left, search on right
- [ ] `TableStatusFilter` renders as a `Select` dropdown with French labels
- [ ] `TableSearchInput` triggers `onSearch` on Enter key
- [ ] `TableActionDropdown` renders `⋮` trigger with dropdown menu, hides items with `hidden: true`
- [ ] `FormSuccessResult` renders success icon, title, and close button
- [ ] `CreateEditModal` switches between form view and success view
- [ ] `ActionModal` renders `ErrorAlert` when error prop is set
- [ ] Table rows show checkboxes on the left
- [ ] Pagination shows `← Précédent` / `Suivant →` with numbered pages
