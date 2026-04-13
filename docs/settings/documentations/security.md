# Settings — Security Tab

## Overview

The **Security** tab contains three sections:

1. **Change Password** — Inline form (no modal) for changing the admin password
2. **Roles & Permissions** — Read-only display of the admin's assigned roles and their permissions
3. **Sessions** — List of active sessions with ability to revoke (log out from a device)

---

## Layout

```
┌──────────────────────────────────────────────────────┐
│  Sécurité                                             │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Changer le mot de passe                        │  │
│  │                                                │  │
│  │  Mot de passe actuel                           │  │
│  │  ┌──────────────────────────────────────┐      │  │
│  │  │ ••••••••••••••                        │      │  │
│  │  └──────────────────────────────────────┘      │  │
│  │                                                │  │
│  │  Nouveau mot de passe                          │  │
│  │  ┌──────────────────────────────────────┐      │  │
│  │  │ ••••••••••••••                        │      │  │
│  │  └──────────────────────────────────────┘      │  │
│  │                                                │  │
│  │  Confirmer le mot de passe                     │  │
│  │  ┌──────────────────────────────────────┐      │  │
│  │  │ ••••••••••••••                        │      │  │
│  │  └──────────────────────────────────────┘      │  │
│  │                                                │  │
│  │  [ErrorAlert]                                  │  │
│  │                         [Mettre à jour]        │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Rôles & Permissions                            │  │
│  │                                                │  │
│  │  ┌─ SuperAdmin ─────────────────────────────┐  │  │
│  │  │  Description: Accès complet au système    │  │  │
│  │  │  Permissions:                             │  │  │
│  │  │  ┌────────┬──────────┬─────────────────┐  │  │  │
│  │  │  │Resource│  Action  │  Description     │  │  │  │
│  │  │  ├────────┼──────────┼─────────────────┤  │  │  │
│  │  │  │articles│  create  │  Créer articles  │  │  │  │
│  │  │  │articles│  read    │  Lire articles   │  │  │  │
│  │  │  │ ...    │  ...     │  ...             │  │  │  │
│  │  │  └────────┴──────────┴─────────────────┘  │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Sessions actives                               │  │
│  │                                                │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ 🖥 Desktop · Chrome · Windows            │  │  │
│  │  │ IP: 192.168.1.1 · Dashboard              │  │  │
│  │  │ Expire: 2026-04-15 14:30                 │  │  │
│  │  │ Statut: Actif              [Révoquer]    │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ 📱 Mobile · Safari · iOS                 │  │  │
│  │  │ IP: 10.0.0.5 · MobileApp                │  │  │
│  │  │ Expire: 2026-04-10 09:00                 │  │  │
│  │  │ Statut: Actif              [Révoquer]    │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 1. Change Password

### Form — Inline (No Modal)

The password change form is rendered **directly on the page**, not inside a modal. This follows the design intent for a security-critical action — the user should see the form in full context.

### Form Fields

| Field Label (FR) | Field Name | Type | Rules |
| --- | --- | --- | --- |
| Mot de passe actuel | `oldPassword` | `Input.Password` | Required |
| Nouveau mot de passe | `newPassword` | `Input.Password` | Required, min 6 chars, uppercase, lowercase, digit |
| Confirmer le mot de passe | `confirmPassword` | `Input.Password` | Required, must match `newPassword` |

### Validation Rules

Reuse the same password strength pattern from `ResetPasswordValidator`:

```ts
const ChangePasswordValidator = {
    oldPassword: (name: string): Rule[] => [
        ...ValidatorUtils.required(name)
    ],
    newPassword: (name: string): Rule[] => [
        ...ValidatorUtils.required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            message: `${name} doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre`
        }
    ],
    confirmPassword: (name: string): Rule[] => [
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value) return Promise.reject(`${name} est requis`);
                if (getFieldValue("newPassword") !== value)
                    return Promise.reject("Les deux mots de passe ne correspondent pas");
                return Promise.resolve();
            }
        })
    ]
};
```

### Endpoint

- **Method**: `PATCH /api/v1/admin/auth/change-password`
- **API method**: `apiClient.api.adminChangePassword(data)`
- **Request body** (`AdminChangePasswordRequest`):
  ```ts
  {
    oldPassword: string;
    newPassword: string;
  }
  ```
  Note: `confirmPassword` is a frontend-only field — not sent to the API.
- **Response**: `AdminChangePasswordResponse { isSuccess: boolean }`

### Behavior

1. User fills in all three fields
2. Client-side validation runs on submit + blur
3. On submit: dispatch `changePasswordAction`
4. **On success**: Reset form fields, show success notification, dispatch reset action
5. **On error**: Display error via `ErrorAlert` below the form (e.g., "Mot de passe actuel incorrect")

### Notifications

```ts
changePasswordSuccess: {
    type: "success",
    message: "Mot de passe modifié",
    description: "Votre mot de passe a été modifié avec succès."
}
```

---

## 2. Roles & Permissions

### Data Loading

- **Endpoint**: `GET /api/v1/admin/me/roles`
- **API method**: `apiClient.api.adminGetOwnRoles()`
- **Response**: `AdminGetOwnRolesResponse { roles: RoleWithPermissionsDto[] }`

### Display

Roles are displayed as collapsible cards (using Ant Design `Collapse` component):

Each role card shows:

| Field | Source | Description |
| --- | --- | --- |
| Role name | `role.name` | Card header, bold text |
| Description | `role.description` | Below name, muted text |
| Status | `role.isActive` | Badge: Actif (green) / Inactif (red) |
| Permissions table | `role.permissions[]` | Nested table inside collapsed panel |

### Permissions Table Columns

| Column | Source | Description |
| --- | --- | --- |
| Ressource | `permission.resource` | Resource being accessed |
| Action | `permission.action` | Operation type |
| Description | `permission.description` | Human-readable description |
| Statut | `permission.isActive` | Badge: Actif / Inactif |

### Behavior

- **Read-only**: No edit actions — this is a display-only section
- **Load on tab mount**: Fetch roles when Security tab becomes active
- **Empty state**: If no roles, show "Aucun rôle assigné" message

---

## 3. Sessions

### Data Loading

- **Endpoint**: `GET /api/v1/public/me/sessions`
- **API method**: `apiClient.api.adminGetOwnSessions({ isActive: true })`
- **Response**: `PublicGetOwnSessionsResponse { sessions: SessionDto[] }`

### SessionDto Fields

```ts
interface SessionDto {
    id: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    browser: "Chrome" | "InternetExplorer" | "Safari" | "Firefox" | "Edge" | "Opera" | "GoogleSearchApp" | "Samsung" | "Unknown";
    device: "Desktop" | "Tablet" | "Mobile" | "Watch" | "Tv" | "Console" | "Car" | "IoT" | "Unknown";
    platform: "Windows" | "Mac" | "Ios" | "IpadOs" | "Linux" | "Android" | "ChromeOs" | "Unknown";
    client: "MobileApp" | "WebApp" | "Dashboard" | "Unknown";
    expiresAt: string;     // ISO 8601 datetime
    isActive: boolean;
}
```

### Session Card Display

Each session is rendered as a card showing:

| Element | Source | Format |
| --- | --- | --- |
| Device icon | `session.device` | Icon: Desktop, Mobile, Tablet, etc. |
| Device + Browser + Platform | Combined | e.g., "Desktop · Chrome · Windows" |
| IP Address | `session.ipAddress` | e.g., "IP: 192.168.1.1" |
| Client | `session.client` | e.g., "Dashboard", "MobileApp" |
| Expiration | `session.expiresAt` | Formatted date |
| Status | `session.isActive` | Badge: Actif (green) / Expiré (red) |
| Revoke button | — | Danger button, only for active sessions |

### Revoke Session

- **Endpoint**: `POST /api/v1/public/me/sessions/revoke/{id}`
- **API method**: `apiClient.api.adminRevokeSession(sessionId)`
- **Response**: `PublicRevokeSessionResponse { isSuccess: boolean }`

### Revoke Flow

1. User clicks "Révoquer" on a session card
2. Show confirmation modal: "Êtes-vous sûr de vouloir révoquer cette session ?"
3. On confirm: dispatch `revokeSessionAction(sessionId)`
4. **On success**: Remove session from list (or refetch sessions), show success notification
5. **On error**: Show error notification

### Notifications

```ts
sessionRevokeSuccess: {
    type: "success",
    message: "Session révoquée",
    description: "L'appareil a été déconnecté avec succès."
}
```

### Empty State

If no active sessions: "Aucune session active"

---

## Backend Implementation Note

The sessions endpoints (`GET /api/v1/public/me/sessions`, `GET /api/v1/public/me/sessions/{id}`, `POST /api/v1/public/me/sessions/revoke/{id}`) currently exist under the `public` namespace. The same endpoints need to be implemented for admin users as well. Until admin-specific session endpoints are available, the public endpoints are used since they operate on the authenticated user's sessions regardless of user type.
