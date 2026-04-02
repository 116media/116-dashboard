# Phase 10: Containers and Pages

List containers and page wrappers for all 3 catalog resources.

---

## Containers

**Path:** `src/modules/catalog/presentation/containers/`

### `CategoriesListContainer/index.tsx`

Wires all category hooks, manages modal/drawer state:

```
PageHeader (title="Catégories", subtitle="Gérer les catégories", icon, onCreate)
TableToolbar (statusFilter, no search)
Table (dataSource=items, columns, pagination server-side)
CreateEditModal (create) — conditional render
CreateEditModal (edit) — conditional render
CategoryActionModal
CategoryPricingPanel (drawer, opened via managePricing action)
```

French labels:
- Page title: "Catégories"
- Subtitle: "Gérer les catégories"
- Create button: "Créer une catégorie"
- Create modal title: "Créer une catégorie"
- Edit modal title: "Modifier la catégorie"
- Pricing panel title: "Gérer les tarifs"

### `CustomersListContainer/index.tsx`

Wires all customer hooks, manages modal state:

```
PageHeader (title="Clients", subtitle="Gérer les clients", icon, onCreate)
Table (dataSource=items, columns, pagination server-side)
CreateEditModal (create) — conditional render
CreateEditModal (edit) — conditional render
```

No `TableToolbar` — customers have no status filter.
No action modal — customers have no status-change actions.

French labels:
- Page title: "Clients"
- Subtitle: "Gérer les clients"
- Create button: "Créer un client"
- Create modal title: "Créer un client"
- Edit modal title: "Modifier le client"

### `PackagesListContainer/index.tsx`

Wires all package hooks, manages modal/drawer state:

```
PageHeader (title="Forfaits", subtitle="Gérer les forfaits", icon, onCreate)
TableToolbar (statusFilter, no search)
Table (dataSource=items, columns, pagination server-side)
CreateEditModal (create) — conditional render
PackageActionModal
PackageSlotsPanel (drawer, opened via manageSlots action)
```

No edit modal — packages have no update endpoint.

French labels:
- Page title: "Forfaits"
- Subtitle: "Gérer les forfaits"
- Create button: "Créer un forfait"
- Create modal title: "Créer un forfait"
- Slots panel title: "Gérer les créneaux"

---

## Pages

**Path:** `src/modules/catalog/presentation/pages/`

Each page is a thin wrapper:

### `CategoriesPage/index.tsx`

```tsx
const CategoriesPage: FC = () => (
    <div className={styles.page}>
        <title>{`Catégories | ${APP_NAME}`}</title>
        <CategoriesListContainer />
    </div>
);
```

### `CustomersPage/index.tsx`

Title: `"Clients | ${APP_NAME}"`

### `PackagesPage/index.tsx`

Title: `"Forfaits | ${APP_NAME}"`

Each page has a matching `index.module.scss` with the `.page` class.

---

## Key Differences from Lookup Containers

1. **Server-side pagination** — Table uses `pagination={{ current: page, pageSize, total, onChange: onPageChange }}` instead of `pagination={false}`
2. **No edit modal for packages** — there is no update endpoint; the create modal is the only form modal
3. **Management panels** — categories and packages open a drawer for nested resource management (pricing / slots) instead of a simple action modal
4. **No status filter for customers** — `CustomersListContainer` omits `TableToolbar` entirely
5. **Conditional CreateEditModal render** — wrapped in `{createOpen && (...)}` to avoid `useForm` warning

---

## TODO

- [ ] Create 3 container components with JSDoc
- [ ] Create 3 page components with JSDoc
- [ ] Create 3 page SCSS files
