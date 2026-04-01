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
| Overview | `/overview` | Admin or SuperAdmin | — (always accessible to authenticated admins) |
| Contents | `/contents` | Admin or SuperAdmin | `contents:read` |
| Videos | `/videos` | Admin or SuperAdmin | `videos:read` |
| Articles | `/articles` | Admin or SuperAdmin | `articles:read` |
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

| Nav Item | Required Role | Future Permission |
| --- | --- | --- |
| Accueil | Admin or SuperAdmin | — |
| Contenus | Admin or SuperAdmin | `contents:read` |
| Vidéos | Admin or SuperAdmin | `videos:read` |
| Articles | Admin or SuperAdmin | `articles:read` |
| Bannières | Admin or SuperAdmin | `ads:read` |
| Popups | Admin or SuperAdmin | `ads:read` |
| Administrateurs | Admin or SuperAdmin | `admins:read` |
| Utilisateurs | Admin or SuperAdmin | `users:read` |
| Rôles | Admin or SuperAdmin | `roles:read` |
| Permissions | Admin or SuperAdmin | `permissions:read` |
| Paramètres | Admin or SuperAdmin | — |

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

| Resource | Actions |
| --- | --- |
| `articles` | `read`, `create`, `update`, `delete`, `publish`, `archive` |
| `videos` | `read`, `create`, `update`, `delete`, `publish`, `archive` |
| `shorts` | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `roles` | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `permissions` | `read`, `create`, `update`, `delete`, `activate`, `deactivate` |
| `users` | `read`, `update`, `assign_role`, `remove_role` |
| `admins` | `read`, `create`, `update`, `delete` |
| `sessions` | `read`, `revoke`, `force_logout` |
| `ads_banners` | `read`, `create`, `update`, `delete` |
| `ads_stories` | `read`, `create`, `update`, `delete` |

The frontend `useAuthorization` hook and `<PermissionRoute>` component are designed to support this transition — no code changes will be needed, only updating route configs and UI checks from role-based to permission-based.
