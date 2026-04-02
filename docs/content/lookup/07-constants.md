# Phase 7: Constants

Dropdown config, action modal config, and status filter options per resource.

**Path:** `src/modules/lookup/presentation/constants/`

---

## Content Types

### `lookup.content-types.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `edit` | "Modifier" | `!isSuperAdmin` |
| `activate` | "Activer" | `!isAdminOrSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isAdminOrSuperAdmin \|\| !record.isActive` |

> Content types allow Admin (not just SuperAdmin) for activate/deactivate.

### `lookup.content-types.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer le type de contenu" | `false` |
| `deactivate` | "Désactiver le type de contenu" | `false` |

### `lookup.content-types.status.ts`

Options: `all` ("Tous"), `active` ("Actifs"), `inactive` ("Inactifs")

---

## Pricing Tiers

### `lookup.pricing-tiers.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `edit` | "Modifier" | `!isSuperAdmin` |
| `activate` | "Activer" | `!isSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isSuperAdmin \|\| !record.isActive` |

### `lookup.pricing-tiers.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer le niveau tarifaire" | `false` |
| `deactivate` | "Désactiver le niveau tarifaire" | `false` |

### `lookup.pricing-tiers.status.ts`

Options: `all` ("Tous"), `active` ("Actifs"), `inactive` ("Inactifs")

---

## Promotion Levels

### `lookup.promotion-levels.dropdown.ts`

| Action | Label | Hidden |
| --- | --- | --- |
| `edit` | "Modifier" | `!isSuperAdmin` |
| `activate` | "Activer" | `!isSuperAdmin \|\| record.isActive` |
| `deactivate` | "Désactiver" | `!isSuperAdmin \|\| !record.isActive` |

### `lookup.promotion-levels.config.ts`

| Action | Title | Danger |
| --- | --- | --- |
| `activate` | "Activer le niveau de promotion" | `false` |
| `deactivate` | "Désactiver le niveau de promotion" | `false` |

### `lookup.promotion-levels.status.ts`

Options: `all` ("Tous"), `active` ("Actifs"), `inactive` ("Inactifs")

---

## Tags

### `lookup.tags.dropdown.ts`

Tags have no activate/deactivate — only edit (which the user confirmed should not exist for tags, as they are immutable after creation). If edit is needed later, it can be added.

> Currently tags only support `create` + `getAll`. No dropdown actions needed unless edit is added.

---

## TODO

- [ ] Create 3 dropdown config files (content-types, pricing-tiers, promotion-levels)
- [ ] Create 3 action config files
- [ ] Create 3 status option files
- [ ] Create tags dropdown config (empty or minimal)
