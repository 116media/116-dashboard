# Content Domain — UI/UX Specification

How the content sub-modules appear in the navigation and how they relate.

---

## French UI Labels

| Backend Sub-module | French UI Label | SideNav Icon Group |
| --- | --- | --- |
| Lookup | **Références** | Own group |
| Catalog | **Catalogue** | Own group |
| Editorial | **Édition** | Own group |
| Commerce | **Ventes** | Own group |

---

## Sub-module Relationships

```
RÉFÉRENCES (foundation — no dependencies)
  Types de contenu, Niveaux tarifaires, Promotions, Tags
        ↓
CATALOGUE (depends on Références)
  Catégories → need Types de contenu
  Tarification → needs Catégories + Niveaux tarifaires
  Packages → slots reference Catégories
  Clients → standalone B2B
        ↓
ÉDITION (depends on Catalogue + Références)
  Articles → need Catégories + Tags
  Vidéos → need Catégories + Tags
  Shorts → optional parent Vidéo
  Paroles → optional linked Vidéo/Article
        ↓
VENTES (depends on Catalogue + Références; stamps Édition)
  Commandes → need Clients + Packages
  Articles de commande → need Catégories + Promotions + Niveaux tarifaires
  Paiements → need Commandes
  Vérification → stamps Articles/Vidéos (SocialBoost, IsFeatured)
```

---

## Admin Workflow

1. **Configurer les références** — créer les types de contenu, définir les niveaux tarifaires et promotions, ajouter des tags
2. **Construire le catalogue** — créer des catégories liées aux types de contenu avec tarification, enregistrer les clients B2B, définir les packages
3. **Créer du contenu** — rédiger des articles, télécharger des vidéos dans les catégories, créer des shorts, ajouter des paroles
4. **Gérer les ventes** — créer des commandes pour les clients, ajouter des articles, gérer les paiements

---

## Navigation Structure

The SideNav groups these 4 content concerns + existing modules into **collapsible icon groups** using the Popover pattern. Each group gets one icon button that expands into sub-items.

### SideNav Layout

```
┌──────┐
│  🏠  │  1. Accueil                    module: overview
│      │
│  📚  │  2. Références ← Popover      module: lookup
│      │     Types de contenu, Tarifs, Promotions, Tags
│      │
│  📂  │  3. Catalogue ← Popover       module: catalog
│      │     Catégories, Clients, Packages
│      │
│  📝  │  4. Édition ← Popover         module: editorial
│      │     Articles, Vidéos, Shorts, Paroles
│      │
│  💰  │  5. Ventes ← Popover          module: commerce
│      │     Commandes, Paiements
│      │
│  📢  │  6. Publicité ← Popover       module: ads
│      │     Bannières, Popups
│      │
│  👤+ │  7. Admins                     module: admins
│      │
│  👤  │  8. Utilisateurs              module: users
│      │
│  🛡️  │  9. Rôles                     module: roles
│      │
│  🔑  │  10. Permissions              module: permissions
│      │
│  ⚙️  │  11. Paramètres               platform: settings
│      │
│  👤  │  12. Avatar
└──────┘
```

### Popover Sub-items

**Références** (click to expand):

```
┌─────────────────────────────┐
│ Références                  │
├─────────────────────────────┤
│ 📦 Types de contenu         │
│ 💲 Niveaux tarifaires       │
│ ⭐ Promotions               │
│ 🏷️ Tags                     │
└─────────────────────────────┘
```

**Catalogue** (click to expand):

```
┌─────────────────────────────┐
│ Catalogue                   │
├─────────────────────────────┤
│ 📂 Catégories               │
│ 👤 Clients                  │
│ 📦 Packages                 │
└─────────────────────────────┘
```

**Édition** (click to expand):

```
┌─────────────────────────────┐
│ Édition                     │
├─────────────────────────────┤
│ 📄 Articles                 │
│ 🎬 Vidéos                   │
│ 📱 Shorts                   │
│ 🎵 Paroles                  │
└─────────────────────────────┘
```

**Ventes** (click to expand):

```
┌─────────────────────────────┐
│ Ventes                      │
├─────────────────────────────┤
│ 📋 Commandes                │
│ 💳 Paiements                │
└─────────────────────────────┘
```

**Publicité** (click to expand):

```
┌─────────────────────────────┐
│ Publicité                   │
├─────────────────────────────┤
│ 🔥 Bannières                │
│ 💬 Popups                   │
└─────────────────────────────┘
```

> **Note:** Admins, Utilisateurs, Rôles, and Permissions are **standalone nav items** (direct icon buttons with tooltips), not grouped in a Popover. Only Références, Catalogue, Édition, Ventes, and Publicité use the Popover pattern because they have multiple sub-pages.

---

## Page Layout

### Références — Tabbed Page (like Settings)

The 4 lookup resources share a single tabbed page since they're all simple CRUD tables:

**Route:** `/references/:tab?`

```
┌───────────────────────────────────────────────────────────────┐
│ title: Références - Types de contenu | 116                    │
├───────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────────────────┐│
│  │ Références          │  │                                  ││
│  ├─────────────────────┤  │  📦 Types de contenu             ││
│  │ 📦 Types de contenu │  │     Gérer les types de contenu.  ││
│  │ 💲 Niveaux tarif.   │  │  ────────────────────────────── ││
│  │ ⭐ Promotions       │  │                                  ││
│  │ 🏷️ Tags             │  │  [Créer un type]  [🔍 Actif ▾]  ││
│  │                     │  │                                  ││
│  │                     │  │  ┌──────────────────────────────┐││
│  │                     │  │  │ Nom     Statut   Actions     │││
│  │                     │  │  │ ...                          │││
│  │                     │  │  └──────────────────────────────┘││
│  └─────────────────────┘  └─────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

Tab URLs:
- `/references` → defaults to `content-types`
- `/references/content-types`
- `/references/pricing-tiers`
- `/references/promotion-levels`
- `/references/tags`

### Catalogue — Tabbed Page

**Route:** `/catalog/:tab?`

Tab URLs:
- `/catalog` → defaults to `categories`
- `/catalog/categories`
- `/catalog/customers`
- `/catalog/packages`

### Édition — Separate Pages

Editorial resources are complex (workflow, image upload, SEO, rich text) and each deserves its own full page:

- `/articles` → ArticlesPage (existing path, kept)
- `/videos` → VideosPage (existing path, kept)
- `/shorts` → ShortsPage (new)
- `/lyrics` → LyricsPage (new)

### Ventes — Separate Pages

Orders have a detail view and complex nested forms:

- `/orders` → OrdersPage
- `/orders/:id` → OrderDetailPage

---

## SideNav ↔ Page Tab Sync

When a user clicks a sub-item in a SideNav Popover (e.g., "Niveaux tarifaires" under Références), it navigates to `/references/pricing-tiers`. The tabbed page reads `:tab` and activates the correct sidebar tab.

The parent icon stays highlighted via `startsWith`:
- Références icon: `startsWith("/references")`
- Catalogue icon: `startsWith("/catalog")`
- Édition icon: any of `/articles`, `/videos`, `/shorts`, `/lyrics`
- Ventes icon: `startsWith("/orders")`

---

## Navigation Implementation

### `INavigationItem` Changes

```ts
export interface INavigationItem {
    icon: FC;
    path: string;
    label: string;
    permission?: { resource: string; action: string };
    children?: INavigationChildItem[];
}

export interface INavigationChildItem {
    icon: FC;
    path: string;
    label: string;
    permission?: { resource: string; action: string };
}
```

### SideNav Changes

For items with `children`:
1. Render `<Popover>` with `<Menu>` instead of `<Tooltip>` + direct navigation
2. Highlight parent icon when any child path matches
3. Filter children by `hasPermission`

```tsx
const isActive = item.children
    ? item.children.some(child => location.pathname.startsWith(child.path))
    : location.pathname.startsWith(item.path);
```

---

## Path Constants

```ts
// Références (Lookup)
export const REFERENCES_PATH = "/references";
export const CONTENT_TYPES_PATH = "/references/content-types";
export const PRICING_TIERS_PATH = "/references/pricing-tiers";
export const PROMOTION_LEVELS_PATH = "/references/promotion-levels";
export const TAGS_PATH = "/references/tags";

// Catalogue (Catalog)
export const CATALOG_PATH = "/catalog";
export const CATEGORIES_PATH = "/catalog/categories";
export const CUSTOMERS_PATH = "/catalog/customers";
export const PACKAGES_PATH = "/catalog/packages";

// Édition (Editorial — keep existing article/video paths)
export const ARTICLE_PATH = "/articles";    // existing
export const VIDEO_PATH = "/videos";        // existing
export const SHORTS_PATH = "/shorts";
export const LYRICS_PATH = "/lyrics";

// Ventes (Commerce)
export const ORDERS_PATH = "/orders";
export const PAYMENTS_PATH = "/payments";
```

---

## What Changes from Current Navigation

| # | Current (11 flat items) | New (12 items: 5 groups + 7 standalone) |
| --- | --- | --- |
| 1 | Accueil | Accueil (unchanged) |
| 2 | Contenus (stub) | **Removed** — replaced by **Références** group |
| 3 | Vidéos (stub) | Moved under **Édition** group |
| 4 | Articles (stub) | Moved under **Édition** group |
| 5 | — | **Catalogue** group (new) |
| 6 | — | **Ventes** group (new) |
| 7 | Bannières + Popups | Grouped under **Publicité** |
| 8 | Administrateurs | **Admins** (standalone, own module) |
| 9 | Utilisateurs | **Utilisateurs** (standalone, unchanged) |
| 10 | Rôles | **Rôles** (standalone, unchanged) |
| 11 | Permissions | **Permissions** (standalone, unchanged) |
| 12 | Paramètres | Paramètres (unchanged) |

## Module Mapping

| Nav Item | Module Folder | Type |
| --- | --- | --- |
| Accueil | `src/modules/overview/` | Standalone |
| Références | `src/modules/lookup/` | Popover group (4 sub-pages) |
| Catalogue | `src/modules/catalog/` | Popover group (3 sub-pages) |
| Édition | `src/modules/editorial/` | Popover group (4 sub-pages) |
| Ventes | `src/modules/commerce/` | Popover group (2 sub-pages) |
| Publicité | `src/modules/ads/` | Popover group (2 sub-pages) |
| Admins | `src/modules/admins/` | Standalone |
| Utilisateurs | `src/modules/users/` | Standalone |
| Rôles | `src/modules/roles/` | Standalone |
| Permissions | `src/modules/permissions/` | Standalone |
| Paramètres | `src/platform/settings/` | Standalone |

### Modules to Create

| Module | Status |
| --- | --- |
| `src/modules/lookup/` | New — Références |
| `src/modules/catalog/` | New — Catalogue |
| `src/modules/editorial/` | New — replaces `articles/` + `videos/` stubs, adds `shorts/` + `lyrics/` |
| `src/modules/commerce/` | New — Ventes |
| `src/modules/admins/` | New — split from `users/` |

### Modules to Remove

| Module | Reason |
| --- | --- |
| `src/modules/contents/` | Replaced by `lookup/` |
| `src/modules/articles/` | Merged into `editorial/` |
| `src/modules/videos/` | Merged into `editorial/` |

---

## Components

### LookupPage (mirrors SettingsPage)

```tsx
type LookupTab = "content-types" | "pricing-tiers" | "promotion-levels" | "tags";

const containerMap: Record<LookupTab, FC> = {
    "content-types":    ContentTypesListContainer,
    "pricing-tiers":    PricingTiersListContainer,
    "promotion-levels": PromotionLevelsListContainer,
    "tags":             TagsListContainer
};
```

### LookupSidebar (mirrors SettingsSidebar)

```tsx
const LOOKUP_TABS = [
    { key: "content-types",    label: "Types de contenu",    icon: <IconAppstoreOutlined /> },
    { key: "pricing-tiers",    label: "Niveaux tarifaires",  icon: <IconDollarOutlined /> },
    { key: "promotion-levels", label: "Promotions",          icon: <IconStarOutlined /> },
    { key: "tags",             label: "Tags",                icon: <IconTagOutlined /> }
];
```

### CatalogPage (same pattern)

```tsx
type CatalogTab = "categories" | "customers" | "packages";

const containerMap: Record<CatalogTab, FC> = {
    "categories": CategoriesListContainer,
    "customers":  CustomersListContainer,
    "packages":   PackagesListContainer
};
```

---

## Files to Create/Modify

| File | Action |
| --- | --- |
| `src/shared/presentation/constants/navigation.ts` | Add `children` support, replace flat items with grouped + standalone items |
| `src/shared/presentation/layouts/DashboardLayout/SideNav/index.tsx` | Handle `children` with `Popover` + `Menu`, keep `Tooltip` for standalone items |
| `src/shared/presentation/constants/paths.ts` | Add all new path constants |
| `src/routes.tsx` | Add tabbed routes for `/references/:tab?` and `/catalog/:tab?`, separate routes for editorial and commerce |
| `src/modules/lookup/` | New module — Références |
| `src/modules/catalog/` | New module — Catalogue |
| `src/modules/editorial/` | New module — Édition (articles, videos, shorts, lyrics) |
| `src/modules/commerce/` | New module — Ventes |
| `src/modules/admins/` | New module — split from `users/` |
| `src/modules/contents/` | Delete — replaced by `lookup/` |
| `src/modules/articles/` | Delete — merged into `editorial/` |
| `src/modules/videos/` | Delete — merged into `editorial/` |

---

## TODO

### Navigation
- [ ] Add `children` and `INavigationChildItem` to `INavigationItem`
- [ ] Update `NAVIGATION_ITEMS` with 5 grouped + 7 standalone items
- [ ] Update `SideNav` to render `Popover` for items with `children`
- [ ] Add all new path constants to `paths.ts`
- [ ] Update `routes.tsx` with tabbed and standalone routes

### New Modules
- [ ] Create `src/modules/lookup/` (Références)
- [ ] Create `src/modules/catalog/` (Catalogue)
- [ ] Create `src/modules/editorial/` (Édition — articles, videos, shorts, lyrics)
- [ ] Create `src/modules/commerce/` (Ventes)
- [ ] Create `src/modules/admins/` (split from users)

### Cleanup
- [ ] Delete `src/modules/contents/` (replaced by lookup)
- [ ] Delete `src/modules/articles/` (merged into editorial)
- [ ] Delete `src/modules/videos/` (merged into editorial)
