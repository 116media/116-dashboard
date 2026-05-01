# Phase 7: Constants

Dropdown config, action modal config, and status filter options per resource.

**Path:** `src/modules/catalog/presentation/constants/`

---

## Categories

### `catalog.categories.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `edit` | "Modifier" | `!isSuperAdmin` |
| `activate` | "Activer" | `!isAdminOrSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isAdminOrSuperAdmin \|\| !record.isActive` |
| `managePricing` | "Gérer les tarifs" | `!isSuperAdmin` |

> Categories allow AdminOrSuperAdmin for activate/deactivate. Pricing management is SuperAdminOnly.

### `catalog.categories.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer la catégorie" | `false` |
| `deactivate` | "Désactiver la catégorie" | `false` |

### `catalog.categories.status.ts`

Options: `all` ("Tous"), `active` ("Actifs"), `inactive` ("Inactifs")

---

## Customers

### `catalog.customers.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `edit` | "Modifier" | `!isAdminOrSuperAdmin` |

> Customers have no activate/deactivate. All actions are AdminOrSuperAdmin.

### `catalog.customers.config.ts`

No action modal config required — customers have no status-change actions.

### `catalog.customers.status.ts`

Customers have no `isActive` field — no status filter needed. Omit this file.

---

## Packages

### `catalog.packages.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `activate` | "Activer" | `!isAdminOrSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isAdminOrSuperAdmin \|\| !record.isActive` |
| `manageSlots` | "Gérer les créneaux" | `!isSuperAdmin` |

> Packages have no edit endpoint — name, description, and price are set at creation. Slot management is SuperAdminOnly.

### `catalog.packages.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer le forfait" | `false` |
| `deactivate` | "Désactiver le forfait" | `false` |

### `catalog.packages.status.ts`

Options: `all` ("Tous"), `active` ("Actifs"), `inactive` ("Inactifs")

---

## TODO

- [x] Create 3 dropdown config files (categories, customers, packages)
- [x] Create 2 action config files (categories, packages — customers have none)
- [x] Create 2 status option files (categories, packages — customers have none)
