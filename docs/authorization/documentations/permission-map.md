# Permission Map

Complete mapping of every dashboard resource to its required backend authorization.

---

## Backend Authorization Model

The backend currently uses **role-based authorization** (not fine-grained `resource:action` permissions) for admin endpoints. The three core roles are:

| Role | Description |
| --- | --- |
| `SuperAdmin` | Full system access — can manage roles, permissions, users, and all content |
| `Admin` | Administrative access — can read most resources and update some, but cannot manage roles/permissions or perform destructive actions |
| `Visitor` | Public app user — the only role with `resource:action` permissions (28 seeded) |

### Important: Role-Based vs Permission-Based

The admin dashboard authorization is enforced by **role** (`RequireSuperAdminOnly` or `RequireAdminOrSuperAdmin`), not by `resource:action` permissions. However, the `useAuthorization` hook should support **both** patterns:

1. **Role checks** — `isSuperAdmin`, `isAdmin`, `isAdminOrSuperAdmin` — for the current backend model
2. **Permission checks** — `hasPermission({ resource, action })` — for future fine-grained RBAC

This way, when the backend adds `resource:action` permissions for admin operations, the frontend is ready.

---

## Dashboard Page → Authorization Map

### Route-Level Access (who can see the page)

| Dashboard Page | Route Path | Required Role | Future Permission |
| --- | --- | --- | --- |
| Overview | `/overview` | Admin or SuperAdmin | — (always accessible) |
| Références — Types de contenu | `/references/content-types` | Admin or SuperAdmin | `content-types:read` |
| Références — Niveaux tarifaires | `/references/pricing-tiers` | Admin or SuperAdmin | `pricing-tiers:read` |
| Références — Promotions | `/references/promotion-levels` | Admin or SuperAdmin | `promotion-levels:read` |
| Références — Tags | `/references/tags` | Admin or SuperAdmin | `tags:read` |
| Catalogue — Catégories | `/catalog/categories` | Admin or SuperAdmin | `categories:read` |
| Catalogue — Clients | `/catalog/customers` | Admin or SuperAdmin | `customers:read` |
| Catalogue — Packages | `/catalog/packages` | Admin or SuperAdmin | `packages:read` |
| Édition — Articles | `/articles` | Admin or SuperAdmin | `articles:read` |
| Édition — Vidéos | `/videos` | Admin or SuperAdmin | `videos:read` |
| Édition — Shorts | `/shorts` | Admin or SuperAdmin | `shorts:read` |
| Édition — Paroles | `/lyrics` | Admin or SuperAdmin | `lyrics:read` |
| Ventes — Commandes | `/orders` | Admin or SuperAdmin | `orders:read` |
| Ventes — Paiements | `/payments` | Admin or SuperAdmin | `payments:read` |
| Ads Banners | `/ads/banners` | Admin or SuperAdmin | `ads:read` |
| Ads Popups | `/ads/popups` | Admin or SuperAdmin | `ads:read` |
| Administrators | `/admins` | Admin or SuperAdmin | `admins:read` |
| Users | `/users` | Admin or SuperAdmin | `users:read` |
| Roles | `/roles` | Admin or SuperAdmin | `roles:read` |
| Permissions | `/permissions` | Admin or SuperAdmin | `permissions:read` |
| Settings | `/settings` | Admin or SuperAdmin | — (own profile, always accessible) |

### UI-Level Access (who can perform actions)

#### Roles Page (`/roles`)

| UI Element | Required Role | Condition |
| --- | --- | --- |
| View roles list | Admin or SuperAdmin | — |
| "Créer un rôle" button | SuperAdmin | — |
| "Modifier" dropdown | SuperAdmin | — |
| "Assigner une permission" dropdown | SuperAdmin | `!role.isDeleted` |
| "Retirer une permission" dropdown | SuperAdmin | `!role.isDeleted` |
| "Activer" dropdown | SuperAdmin | `!role.isActive && !role.isDeleted` |
| "Désactiver" dropdown | SuperAdmin | `role.isActive` |
| "Supprimer" dropdown | SuperAdmin | `!role.isDeleted` |
| "Restaurer" dropdown | SuperAdmin | `role.isDeleted` |
| "Supprimer définitivement" dropdown | SuperAdmin | `role.isDeleted` |

#### Permissions Page (`/permissions`)

| UI Element | Required Role | Condition |
| --- | --- | --- |
| View permissions list | Admin or SuperAdmin | — |
| "Créer une permission" button | SuperAdmin | — |
| "Modifier" dropdown | SuperAdmin | — |
| "Activer" dropdown | SuperAdmin | `!perm.isActive && !perm.isDeleted` |
| "Désactiver" dropdown | SuperAdmin | `perm.isActive` |
| "Supprimer" dropdown | SuperAdmin | `!perm.isDeleted` |
| "Restaurer" dropdown | SuperAdmin | `perm.isDeleted` |
| "Supprimer définitivement" dropdown | SuperAdmin | `perm.isDeleted` |

#### Settings Page (`/settings`)

| UI Element | Required Role | Notes |
| --- | --- | --- |
| View/edit own profile | Admin or SuperAdmin | Own profile only |
| Change password | Admin or SuperAdmin | Own password only |
| View own sessions | Admin or SuperAdmin | Own sessions only |
| Revoke own session | Admin or SuperAdmin | Own sessions only |
| Sign out | Admin or SuperAdmin | — |
| Sign out from all devices | Admin or SuperAdmin | — |

---

## Navigation Filtering

The sidebar navigation should only show items the user has access to:

| Nav Group | Sub-items | Required Role | Future Permission |
| --- | --- | --- | --- |
| Accueil | — | Admin or SuperAdmin | — |
| Références | Types de contenu | Admin or SuperAdmin | `content-types:read` |
| Références | Niveaux tarifaires | Admin or SuperAdmin | `pricing-tiers:read` |
| Références | Promotions | Admin or SuperAdmin | `promotion-levels:read` |
| Références | Tags | Admin or SuperAdmin | `tags:read` |
| Catalogue | Catégories | Admin or SuperAdmin | `categories:read` |
| Catalogue | Clients | Admin or SuperAdmin | `customers:read` |
| Catalogue | Packages | Admin or SuperAdmin | `packages:read` |
| Édition | Articles | Admin or SuperAdmin | `articles:read` |
| Édition | Vidéos | Admin or SuperAdmin | `videos:read` |
| Édition | Shorts | Admin or SuperAdmin | `shorts:read` |
| Édition | Paroles | Admin or SuperAdmin | `lyrics:read` |
| Ventes | Commandes | Admin or SuperAdmin | `orders:read` |
| Ventes | Paiements | Admin or SuperAdmin | `payments:read` |
| Publicité | Bannières | Admin or SuperAdmin | `ads:read` |
| Publicité | Popups | Admin or SuperAdmin | `ads:read` |
| Gestion | Administrateurs | Admin or SuperAdmin | `admins:read` |
| Gestion | Utilisateurs | Admin or SuperAdmin | `users:read` |
| Gestion | Rôles | Admin or SuperAdmin | `roles:read` |
| Gestion | Permissions | Admin or SuperAdmin | `permissions:read` |
| Paramètres | — | Admin or SuperAdmin | — |

> **Note:** Currently all dashboard users are Admin or SuperAdmin, so all nav items are visible. Navigation filtering will become relevant when the backend adds fine-grained `resource:action` permissions for admin operations, or when custom roles (e.g., "Editor", "Moderator") are created with limited permissions.

---

## SuperAdmin Bypass

The `SuperAdmin` role bypasses all permission checks. This is implemented **inside the `useAuthorization` hook** — when `isSuperAdmin` is `true`, `hasPermission()` always returns `true`. No calling code needs to check `isSuperAdmin` separately.

This means:
- `<PermissionRoute>` does not need special SuperAdmin logic
- `hasPermission({ resource: "roles", action: "create" })` returns `true` for SuperAdmin
- UI components only call `hasPermission(...)`, never `isSuperAdmin || hasPermission(...)`

---

## Future: Fine-Grained Admin Permissions

When the backend adds `resource:action` permissions for admin users, the following permissions should be created:

| Resource | Nav Group (UI) | Actions |
| --- | --- | --- |
| `content-types` | Références | `read`, `create`, `update`, `activate`, `deactivate` |
| `pricing-tiers` | Références | `read`, `create`, `update`, `activate`, `deactivate` |
| `promotion-levels` | Références | `read`, `create`, `update`, `activate`, `deactivate` |
| `tags` | Références | `read`, `create` |
| `categories` | Catalogue | `read`, `create`, `update`, `activate`, `deactivate` |
| `customers` | Catalogue | `read`, `create`, `update` |
| `packages` | Catalogue | `read`, `create`, `activate`, `deactivate` |
| `articles` | Édition | `read`, `create`, `update`, `delete`, `publish`, `archive` |
| `videos` | Édition | `read`, `create`, `update`, `delete`, `publish`, `archive` |
| `shorts` | Édition | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `lyrics` | Édition | `read`, `create`, `update` |
| `orders` | Ventes | `read`, `create`, `update`, `submit`, `cancel` |
| `payments` | Ventes | `read`, `verify`, `reject` |
| `roles` | — | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `permissions` | — | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `users` | — | `read`, `update`, `assign_role`, `remove_role` |
| `admins` | — | `read`, `create`, `update`, `delete` |
| `sessions` | — | `read`, `revoke`, `force_logout` |
| `ads_banners` | — | `read`, `create`, `update`, `delete` |
| `ads_stories` | — | `read`, `create`, `update`, `delete` |

The frontend `useAuthorization` hook and `<PermissionRoute>` component are designed to support this transition — no code changes will be needed, only updating route configs and UI checks from role-based to permission-based.
