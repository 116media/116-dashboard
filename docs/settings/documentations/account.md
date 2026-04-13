# Settings — Account Tab

## Overview

The **Account** tab provides session management actions:

1. **Sign Out** — Log out from the current device
2. **Sign Out from All Devices** — Log out from all devices simultaneously

---

## Layout

```
┌──────────────────────────────────────────────────────┐
│  Compte                                               │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Déconnexion                                    │  │
│  │                                                │  │
│  │  Se déconnecter de cet appareil.               │  │
│  │                                                │  │
│  │                          [Se déconnecter]       │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Déconnexion de tous les appareils              │  │
│  │                                                │  │
│  │  Vous serez déconnecté de tous les appareils   │  │
│  │  sur lesquels vous êtes actuellement connecté. │  │
│  │                                                │  │
│  │              [Se déconnecter de tout] (danger)  │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 1. Sign Out (Current Device)

### Endpoint

- **Method**: `POST /api/v1/admin/auth/sign-out`
- **API method**: `apiClient.api.adminSignOut(data)`
- **Request body** (`AdminSignOutRequest`):
  ```ts
  {
    refreshToken: string;
  }
  ```
- **Response**: `AdminSignOutResponse { isSuccess: boolean }`

### Flow

1. User clicks "Se déconnecter" button
2. Show confirmation modal: "Êtes-vous sûr de vouloir vous déconnecter ?"
3. On confirm: dispatch `signOutAction`
4. **On success**:
   - Clear auth token via `AuthStorageService.clearToken()`
   - Purge Redux persistor
   - Navigate to `LOGIN_PATH`
5. **On error**: Show error notification

### Button Style

- Type: `default`
- Label: "Se déconnecter"

---

## 2. Sign Out from All Devices

### Endpoint

- **Method**: `POST /api/v1/admin/auth/sign-out-all`
- **API method**: `apiClient.api.adminSignOutFromAllDevices()`
- **Request body**: None
- **Response**: `AdminSignOutFromAllDevicesResponse { isSuccess: boolean }`

### Flow

1. User clicks "Se déconnecter de tous les appareils" button
2. Show confirmation modal with warning:
   - Title: "Déconnexion de tous les appareils"
   - Description: "Vous serez déconnecté de tous les appareils. Vous devrez vous reconnecter sur chaque appareil."
3. On confirm: dispatch `signOutAllAction`
4. **On success**:
   - Clear auth token via `AuthStorageService.clearToken()`
   - Purge Redux persistor
   - Navigate to `LOGIN_PATH`
5. **On error**: Show error notification

### Button Style

- Type: `default`
- Danger: `true` (red styling to indicate destructive action)
- Label: "Se déconnecter de tous les appareils"

---

## Post-Logout Cleanup

Both sign-out actions perform the same cleanup sequence:

```
1. API call succeeds
2. AuthStorageService.clearToken()     → removes JWT from localStorage
3. persistor.purge()                   → clears encrypted Redux state
4. navigate(LOGIN_PATH, { replace: true })  → redirect to login
```

This mirrors the existing logout logic in `SettingsDropdownMenu` component.

---

## Notifications

No success notifications needed — the user is redirected to login immediately. Error notifications are shown if the API call fails:

```ts
signOutError: {
    type: "error",
    message: "Erreur de déconnexion",
    description: "Une erreur est survenue lors de la déconnexion. Veuillez réessayer."
}
```
