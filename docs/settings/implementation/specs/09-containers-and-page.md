# Phase 9: Hooks, Containers, and Page

8 custom hooks, 4 container components, and the SettingsPage refactor.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [profile.md](../../documentations/profile.md), [security.md](../../documentations/security.md), [account.md](../../documentations/account.md), [overview.md](../../documentations/overview.md)

**Pattern reference**: `src/modules/auth/presentation/hooks/UseLogin.ts`

> **Error handling reference**: [ui-components.md — Error Display Pattern](../../documentations/ui-components.md#error-display-pattern). Every hook in this phase selects `error: Failure | null` from Redux. Form hooks pass it through; fetch containers render `<ErrorAlert>` with retry; mutation hooks show a toast built from `result.payload.title` / `result.payload.detail`. **Never hardcode error messages.**

---

## Hooks

### `src/platform/settings/presentation/hooks/UseProfile.ts`

- [ ] Define return type: `{ profile: IUser, loading: boolean, error: Failure | null | undefined, fetchProfile: () => void }`
- [ ] Select `data: profile`, `loading`, `error` from `session.currentUser` via `useAppSelector` (profile lives in the session slice, not settings)
- [ ] `fetchProfile`: dispatch `getCurrentUserAction` (from `@/platform/session/presentation/store/currentuser.action`)
- [ ] Return typed interface
- [ ] Error display is the container's responsibility — render `<ErrorAlert error={error} banner showIcon closable onClose={fetchProfile} />` in `ProfileContainer` to give the user a retry button

### `src/platform/settings/presentation/hooks/UseUpdateAccount.ts`

- [ ] Define return type: `{ form, loading, error: Failure | null | undefined, isOpen, open, close, onSubmit }`
- [ ] `useState` for `isOpen` (modal state)
- [ ] `useForm<IUpdateAccountCredentials>()` for form instance
- [ ] Select from `settings.updateAccount` state
- [ ] `open()`: set `isOpen = true`
- [ ] `close()`: set `isOpen = false`, reset form
- [ ] Local state: `const [country, setCountry] = useState<ICountryObject>()`
- [ ] Watch: `const selectedCountryName = useWatch("countryName", form)` → `useEffect` to find and set country from `COUNTRY_LIST`
- [ ] `onSubmit(formValues)`:
  - Derive `countryFlag`, `phoneISOCode`, `phoneDialCode` from the `country` state object
  - Destructure `countryName`, `email`, `userName`, `phonePartial` from `formValues`
  - Dispatch `updateAccountAction({ email, userName, countryName, countryFlag, phonePartial, phoneISOCode, phoneDialCode })`
  - On `fulfilled.match(result)`: close modal, `showNotification(SettingsNotification.profileUpdateSuccess)`, dispatch `setCurrentUserAction(result.payload)` to sync
  - On rejection: no extra code — the error is already in Redux, `<ErrorAlert>` in `AccountInfoModal` renders it
- [ ] `useEffect`: pre-populate form when `isOpen` changes (read profile from `session.currentUser`)

### `src/platform/settings/presentation/hooks/UseUpdateAvatar.ts`

- [ ] Define return type: `{ loading, error: Failure | null | undefined, onUpload }`
- [ ] Select from `settings.updateAvatar` state
- [ ] `onUpload(file: File)`: dispatch `updateAvatarAction(file)`
  - On `fulfilled.match(result)`: `showNotification(SettingsNotification.avatarUpdateSuccess)`, dispatch `setCurrentUserAction(result.payload)`
  - On `rejected.match(result)` — show the backend's error as a toast (there is no form to host an inline alert):

    ```ts
    if (updateAvatarAction.rejected.match(result) && result.payload) {
        showNotification({
            type: "error",
            title: result.payload.title,
            description: result.payload.detail
        });
    }
    ```

### `src/platform/settings/presentation/hooks/UseChangePassword.ts`

- [ ] Define return type: `{ form, loading, error: Failure | null | undefined, onSubmit, resetChangePassword }`
- [ ] `useForm<IChangePasswordCredentials>()`
- [ ] Select from `settings.changePassword` state
- [ ] `onSubmit(values)`: strip `confirmPassword`, dispatch `changePasswordAction({ oldPassword, newPassword })`
  - On success: `form.resetFields()`, `showNotification(SettingsNotification.changePasswordSuccess)`
  - Rejection is inline — `<ErrorAlert>` inside `ChangePasswordForm` renders the Failure
- [ ] `resetChangePassword()`: dispatch `settingsSlice.actions.purge(["changePassword"])`

### `src/platform/settings/presentation/hooks/UseRoles.ts`

- [ ] Define return type: `{ roles: IRoleWithPermissions[], loading, error: Failure | null | undefined, fetchRoles }`
- [ ] Select from `settings.roles` state
- [ ] `fetchRoles`: dispatch `getRolesAction`
- [ ] `SecurityContainer` must render `<ErrorAlert error={rolesError} banner showIcon closable onClose={fetchRoles} />` above the roles `StateRenderer` so fetch failures are visible (with retry via `onClose`)

### `src/platform/session/presentation/hooks/UseSessions.ts` (lives under session module)

- [ ] Define return type: `{ sessions: ISession[], loading, error: Failure | null | undefined, revokeLoading, fetchSessions, onRevoke }`
- [ ] Select from `session.sessions` and `session.revokeSession` states
- [ ] `fetchSessions`: dispatch `getSessionsAction`
- [ ] `onRevoke(sessionId)`:
  - Show `Modal.confirm` with title "Révoquer la session", content "Êtes-vous sûr de vouloir révoquer cette session ? L'appareil sera déconnecté immédiatement.", okText "Révoquer", danger OK button
  - On confirm: dispatch `revokeSessionAction(sessionId)`
  - On `fulfilled.match`: refetch sessions, `showNotification(SettingsNotification.sessionRevokeSuccess)`
  - On `rejected.match(result) && result.payload`: show backend error as a toast:

    ```ts
    showNotification({
        type: "error",
        title: result.payload.title,
        description: result.payload.detail
    });
    ```

- [ ] `SecurityContainer` renders `<ErrorAlert error={sessionsError} banner showIcon closable onClose={fetchSessions} />` above the sessions `StateRenderer`

### `src/modules/auth/presentation/hooks/UseSignOut.ts` (lives under auth module)

- [ ] Define return type: `{ loading, onSignOut }`
- [ ] Select `loading` from `auth.signOut` state
- [ ] `onSignOut()`:
  - Show `Modal.confirm`: title "Déconnexion", content "Êtes-vous sûr de vouloir vous déconnecter ?", okText "Se déconnecter"
  - On confirm: dispatch `signOutAction()` (no args — refresh token comes from HttpOnly cookie)
  - On `rejected.match(result) && result.payload` — show backend error toast (`showNotification({ type: "error", title: result.payload.title, description: result.payload.detail })`)
  - Always: `persistor.purge()` and `navigate(LOGIN_PATH, { replace: true })` — graceful logout regardless of API outcome

### `src/modules/auth/presentation/hooks/UseSignOutAll.ts` (lives under auth module)

- [ ] Define return type: `{ loading, onSignOutAll }`
- [ ] Select `loading` from `auth.signOutAll` state
- [ ] `onSignOutAll()`:
  - Show `Modal.confirm`: title "Déconnexion de tous les appareils", content "Vous serez déconnecté de tous les appareils. Vous devrez vous reconnecter sur chaque appareil.", okText "Confirmer", danger OK button
  - On confirm: dispatch `signOutAllAction()`
  - On success: `persistor.purge()`, `navigate(LOGIN_PATH, { replace: true })`
  - On `rejected.match(result) && result.payload`: show backend error toast — do **not** log out on failure

---

## Containers

### `src/platform/settings/presentation/containers/ProfileContainer/index.tsx`

- [ ] Wire hooks: `useProfile()`, `useUpdateAccount()`, `useUpdateAvatar()`
- [ ] Destructure `error: profileError` from `useProfile()`
- [ ] Fetch profile on mount via `useEffect` → `fetchProfile()`
- [ ] Render `<ErrorAlert banner showIcon closable error={profileError} onClose={fetchProfile} />` immediately after the page header — the user sees the fetch failure and can retry
- [ ] Render avatar card section:
  - `Avatar` component (size 80, shape square, src from `profile.avatar?.storageUrl`, fallback `IconUserOutlined`)
  - User name, `RoleBadge` for roles, location (`profile.countryName`)
  - Avatar upload via hidden file input — show skeleton on `avatarLoading`
- [ ] Render account info card (`SettingsCard` with `onEdit={open}`) — 4 `SettingsField` components
- [ ] Render `AccountInfoModal` with hook props (`error={updateAccount.error}` — form displays inline `<ErrorAlert>`)

### `src/platform/settings/presentation/containers/SecurityContainer/index.tsx`

- [ ] Wire hooks: `useChangePassword()`, `useRoles()`, `useSessions()`
- [ ] Destructure `error: rolesError` from `useRoles()` and `error: sessionsError` from `useSessions()`
- [ ] Fetch roles and sessions on mount via `useEffect`
- [ ] Render `ChangePasswordForm` with hook props (form displays inline `<ErrorAlert>`)
- [ ] Render Roles section:
  - `SettingsCard` title "Rôles & Permissions"
  - `<ErrorAlert banner showIcon closable error={rolesError} onClose={fetchRoles} />` above `StateRenderer`
  - `StateRenderer`: maps roles → `RoleCard` / loading skeleton / empty "Aucun rôle assigné"
- [ ] Render Sessions section:
  - `SettingsCard` title "Sessions actives"
  - `<ErrorAlert banner showIcon closable error={sessionsError} onClose={fetchSessions} />` above `StateRenderer`
  - `StateRenderer`: maps sessions → `SessionCard` / loading skeleton / empty "Aucune session active"

### `src/platform/settings/presentation/containers/NotificationContainer/index.tsx`

- [ ] Render `ComingSoon` component
- [ ] No hooks, no state, no API calls

### `src/platform/settings/presentation/containers/AccountContainer/index.tsx`

- [ ] Wire hooks: `useSignOut()`, `useSignOutAll()`
- [ ] Render sign out card:
  - `SettingsCard` title "Déconnexion"
  - Description: "Se déconnecter de cet appareil."
  - Button "Se déconnecter" (default) → `onSignOut()`
- [ ] Render sign out all card:
  - `SettingsCard` title "Déconnexion de tous les appareils"
  - Description: "Vous serez déconnecté de tous les appareils sur lesquels vous êtes actuellement connecté."
  - Button "Se déconnecter de tous les appareils" (default, danger) → `onSignOutAll()`
- [ ] Errors on both actions surface as toasts from the hooks themselves (see UseSignOut / UseSignOutAll) — no container-level error UI needed

---

## Page Refactor

### `src/platform/settings/presentation/pages/SettingsPage/index.tsx` (modify)

- [ ] Replace placeholder content with full settings layout
- [ ] `useState<SettingsTab>("profile")` for active tab
- [ ] Render flex layout: `SettingsSidebar` (left) + content area (right)
- [ ] Map `activeTab` to container:
  - `"profile"` → `ProfileContainer`
  - `"security"` → `SecurityContainer`
  - `"notification"` → `NotificationContainer`
  - `"account"` → `AccountContainer`
- [ ] Keep `Helmet` with "Paramètres | {APP_NAME}"
- [ ] Wrap in `HelmetProvider`

### `src/platform/settings/presentation/pages/SettingsPage/index.module.scss` (create)

- [ ] Settings page flex layout (sidebar + content)
- [ ] Sidebar fixed width, content flex-grow
- [ ] Responsive considerations
