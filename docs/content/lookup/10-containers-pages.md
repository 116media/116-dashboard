# Phase 10: Containers and Pages

List containers and page wrappers for all 4 lookup resources.

---

## Containers

**Path:** `src/modules/lookup/presentation/containers/`

### `ContentTypesListContainer/index.tsx`

Wires all content type hooks, manages modal state:

```
PageHeader (title="Types de contenu", subtitle="Gérer les types de contenu", icon, onCreate)
TableToolbar (statusFilter, no search)
Table (dataSource=filtered items, columns, no pagination)
CreateEditModal (create) — conditional render
CreateEditModal (edit) — conditional render
ContentTypeActionModal
```

French labels:
- Page title: "Types de contenu"
- Subtitle: "Gérer les types de contenu"
- Create button: "Créer un type"
- Create modal title: "Créer un type de contenu"
- Edit modal title: "Modifier le type de contenu"

### `PricingTiersListContainer/index.tsx`

Same pattern.

French labels:
- Page title: "Niveaux tarifaires"
- Subtitle: "Gérer les niveaux tarifaires"
- Create button: "Créer un niveau"
- Create modal title: "Créer un niveau tarifaire"
- Edit modal title: "Modifier le niveau tarifaire"

### `PromotionLevelsListContainer/index.tsx`

Same pattern.

French labels:
- Page title: "Niveaux de promotion"
- Subtitle: "Gérer les niveaux de promotion"
- Create button: "Créer une promotion"
- Create modal title: "Créer un niveau de promotion"
- Edit modal title: "Modifier le niveau de promotion"

### `TagsListContainer/index.tsx`

Simpler — no status filter, no action modal, no edit:

```
PageHeader (title="Tags", subtitle="Gérer les tags", icon, onCreate)
Table (dataSource=items, columns, no pagination)
CreateEditModal (create only) — conditional render
```

French labels:
- Page title: "Tags"
- Subtitle: "Gérer les tags"
- Create button: "Créer un tag"
- Create modal title: "Créer un tag"

---

## Pages

**Path:** `src/modules/lookup/presentation/pages/`

Each page is a thin wrapper (same as `RolesPage`):

### `ContentTypesPage/index.tsx`

```tsx
const ContentTypesPage: FC = () => (
    <div className={styles.page}>
        <title>{`Types de contenu | ${APP_NAME}`}</title>
        <ContentTypesListContainer />
    </div>
);
```

### `PricingTiersPage/index.tsx`

Title: "Niveaux tarifaires | {APP_NAME}"

### `PromotionLevelsPage/index.tsx`

Title: "Niveaux de promotion | {APP_NAME}"

### `TagsPage/index.tsx`

Title: "Tags | {APP_NAME}"

Each page has a matching `index.module.scss` with the `.page` class.

---

## Key Differences from Roles Containers

1. **No pagination** — Table renders with `pagination={false}`
2. **No search input** — Lookup lists are small, no `TableSearchInput`
3. **Client-side status filter** — `TableToolbar` gets `statusFilter` but filters locally
4. **Tags container is minimal** — no status filter, no action modal, no edit modal
5. **Conditional CreateEditModal render** — wrapped in `{createOpen && (...)}` to avoid `useForm` warning

---

## TODO

- [ ] Create 4 container components with JSDoc
- [ ] Create 4 page components with JSDoc
- [ ] Create 4 page SCSS files
