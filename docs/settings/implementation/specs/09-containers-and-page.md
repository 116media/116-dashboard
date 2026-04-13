# Phase 9: Hooks, Containers, and Page

8 custom hooks, 4 container components, and the SettingsPage refactor.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [profile.md](../../documentations/profile.md), [security.md](../../documentations/security.md), [account.md](../../documentations/account.md), [overview.md](../../documentations/overview.md)

**Pattern reference**: `src/modules/auth/presentation/hooks/UseLogin.ts`

---

## Hooks

### `src/modules/settings/presentation/hooks/UseProfile.ts`

- [ ] Define `IUseProfile` return type: `{ profile: IProfile | null, loading: boolean, error: IApiProblemDetails | null, fetchProfile: () => void }`
- [ ] Select from `settings.profile` state via `useAppSelector`
- [ ] `fetchProfile`: dispatch `getProfileAction`
  - On success: dispatch `authSlice.actions.updateUser(result.payload)` to sync auth state
- [ ] Return typed interface

### `src/modules/settings/presentation/hooks/UseUpdateAccount.ts`

- [ ] Define return type: `{ form, loading, error, isOpen, open, close, onSubmit }`
- [ ] `useState` for `isOpen` (modal state)
- [ ] `useForm<IUpdateAccountCredentials>()` for form instance
- [ ] Select from `settings.updateAccount` state
- [ ] `open()`: set `isOpen = true`
- [ ] `close()`: set `isOpen = false`, reset form
- [ ] Local state: `const [country, setCountry] = useState<ICountryObject>()`
- [ ] Watch: `const selectedCountryName = useWatch("countryName", form)` → `useEffect` to find and set country from `countryList`
- [ ] `onSubmit(formValues)`:
  - Derive `countryFlag`, `phoneISOCode`, `phoneDialCode` from the `country` state object
  - Destructure `countryName`, `email`, `userName`, `phonePartial` from `formValues`
  - Dispatch `updateAccountAction({ email, userName, countryName, countryFlag, phonePartial, phoneISOCode, phoneDialCode })`
  - On success: close modal, show `SettingsNotification.profileUpdateSuccess`, dispatch auth `updateUser` action
- [ ] `useEffect`: pre-populate form when `isOpen` changes (get user from profile state — map `partialPhoneNumber` → `phonePartial`, `countryName`)

### `src/modules/settings/presentation/hooks/UseUpdateAvatar.ts`

- [ ] Define return type: `{ loading, error, onUpload }`
- [ ] Select from `settings.updateAvatar` state
- [ ] `onUpload(file: File)`: dispatch `updateAvatarAction(file)`
  - On success: show `SettingsNotification.avatarUpdateSuccess`, dispatch auth `updateUser` action

### `src/modules/settings/presentation/hooks/UseChangePassword.ts`

- [ ] Define return type: `{ form, loading, error, onSubmit, resetChangePassword }`
- [ ] `useForm<IChangePasswordCredentials>()`
- [ ] Select from `settings.changePassword` state
- [ ] `onSubmit(values)`: strip `confirmPassword`, dispatch `changePasswordAction({ oldPassword, newPassword })`
  - On success: `form.resetFields()`, show `SettingsNotification.changePasswordSuccess`
- [ ] `resetChangePassword()`: dispatch `settingsSlice.actions.purge(["changePassword"])`

### `src/modules/settings/presentation/hooks/UseRoles.ts`

- [ ] Define return type: `{ roles: IRoleWithPermissions[], loading, error, fetchRoles }`
- [ ] Select from `settings.roles` state
- [ ] `fetchRoles`: dispatch `getRolesAction`

### `src/modules/settings/presentation/hooks/UseSessions.ts`

- [ ] Define return type: `{ sessions: ISession[], loading, error, revokeLoading, fetchSessions, onRevoke }`
- [ ] Select from `settings.sessions` and `settings.revokeSession` states
- [ ] `fetchSessions`: dispatch `getSessionsAction`
- [ ] `onRevoke(sessionId)`:
  - Show `Modal.confirm` with title "Révoquer la session", content "Êtes-vous sûr de vouloir révoquer cette session ? L'appareil sera déconnecté immédiatement.", okText "Révoquer", danger OK button
  - On confirm: dispatch `revokeSessionAction(sessionId)`
  - On success: refetch sessions, show `SettingsNotification.sessionRevokeSuccess`

### `src/modules/settings/presentation/hooks/UseSignOut.ts`

- [ ] Define return type: `{ loading, onSignOut }`
- [ ] Select from `settings.signOut` state
- [ ] `onSignOut()`:
  - Show `Modal.confirm`: title "Déconnexion", content "Êtes-vous sûr de vouloir vous déconnecter ?", okText "Se déconnecter"
  - On confirm: get `refreshToken` from auth storage, dispatch `signOutAction(refreshToken)`
  - On success: `AuthStorageService.clearToken()`, `persistor.purge()`, `navigate(LOGIN_PATH, { replace: true })`
  - On error: show `SettingsNotification.signOutError`

### `src/modules/settings/presentation/hooks/UseSignOutAll.ts`

- [ ] Define return type: `{ loading, onSignOutAll }`
- [ ] Select from `settings.signOutAll` state
- [ ] `onSignOutAll()`:
  - Show `Modal.confirm`: title "Déconnexion de tous les appareils", content "Vous serez déconnecté de tous les appareils. Vous devrez vous reconnecter sur chaque appareil.", okText "Confirmer", danger OK button
  - On confirm: dispatch `signOutAllAction()`
  - On success: same cleanup as UseSignOut (`clearToken`, `purge`, `navigate`)
  - On error: show `SettingsNotification.signOutError`

---

## Containers

### `src/modules/settings/presentation/containers/ProfileContainer/index.tsx`

- [ ] Wire hooks: `useProfile()`, `useUpdateAccount()`, `useUpdateAvatar()`
- [ ] Fetch profile on mount via `useEffect` → `fetchProfile()`
- [ ] Render avatar card section:
  - `Avatar` component (size 64, shape circle, src from `profile.avatar?.storageUrl`, fallback initials)
  - User name, primary role (`profile.roles[0]?.name`), location (`profile.countryName`)
  - "Modifier" button triggering hidden `<input type="file" accept="image/*" />`
  - Show loading spinner on avatar during upload
- [ ] Render account info card:
  - `SettingsCard` with title "Informations du compte" and `onEdit={open}`
  - 4 `SettingsField` components in two-column grid:
    - Pseudo: `profile.userName`
    - Email: `profile.email`
    - Pays: `profile.countryName`
    - Téléphone: combined `{profile.countryDialCode} {profile.partialPhoneNumber}` (or fallback "—")
- [ ] Render `AccountInfoModal` with hook props

### `src/modules/settings/presentation/containers/SecurityContainer/index.tsx`

- [ ] Wire hooks: `useChangePassword()`, `useRoles()`, `useSessions()`
- [ ] Fetch roles and sessions on mount via `useEffect`
- [ ] Render `ChangePasswordForm` with hook props
- [ ] Render Roles section:
  - `SettingsCard` title "Rôles & Permissions"
  - Map roles → `RoleCard` components wrapped in `Collapse`
  - Empty state: `Empty` with "Aucun rôle assigné"
  - Loading state: Ant Design `Spin`
- [ ] Render Sessions section:
  - `SettingsCard` title "Sessions actives"
  - Map sessions → `SessionCard` components
  - Empty state: `Empty` with "Aucune session active"
  - Loading state: Ant Design `Spin`

### `src/modules/settings/presentation/containers/NotificationContainer/index.tsx`

- [ ] Render `ComingSoon` component
- [ ] No hooks, no state, no API calls

### `src/modules/settings/presentation/containers/AccountContainer/index.tsx`

- [ ] Wire hooks: `useSignOut()`, `useSignOutAll()`
- [ ] Render sign out card:
  - `SettingsCard` title "Déconnexion"
  - Description: "Se déconnecter de cet appareil."
  - Button "Se déconnecter" (default) → `onSignOut()`
- [ ] Render sign out all card:
  - `SettingsCard` title "Déconnexion de tous les appareils"
  - Description: "Vous serez déconnecté de tous les appareils sur lesquels vous êtes actuellement connecté."
  - Button "Se déconnecter de tous les appareils" (default, danger) → `onSignOutAll()`

---

## Page Refactor

### `src/modules/settings/presentation/pages/SettingsPage/index.tsx` (modify)

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

### `src/modules/settings/presentation/pages/SettingsPage/index.module.scss` (create)

- [ ] Settings page flex layout (sidebar + content)
- [ ] Sidebar fixed width, content flex-grow
- [ ] Responsive considerations
