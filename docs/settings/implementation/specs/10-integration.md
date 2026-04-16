# Phase 10: Integration

Wire the settings module into the application's global state and verify everything works end-to-end.

**Ref**: [redux-store.md](../../documentations/redux-store.md) (Root Reducer Integration, Keeping the Current User in Sync)

---

## Modify `src/shared/presentation/store/root.reducer.ts`

- [ ] Import `settingsReducer` from `@/platform/settings/presentation/store`
- [ ] Add `settings: settingsReducer` to `combineReducers` (alongside `auth` and `session`)
- [ ] `IRootState` type automatically picks up `settings` via `ReturnType<typeof rootReducer>`
- [ ] Confirm `settings` is **NOT** added to Redux persist whitelist (only `auth` is persisted)

---

## Register Awilix dependencies

- [ ] Open `src/shared/infrastructure/service.locator.ts`
- [ ] Extend the `Cradle` interface with the new settings repository and use cases (`settingsRepository`, `getProfileUseCase`, `updateAccountUseCase`, `updateAvatarUseCase`, `changePasswordUseCase`, `getRolesUseCase`)
- [ ] Call `registerSettingsDependencies(container)` alongside the other `register*Dependencies` calls
- [ ] The thunks in Phase 5 resolve these via `container.cradle.*UseCase` — no manual instantiation

---

## Syncing profile updates with `session.currentUser`

Profile reads flow through `session.currentUser` (the shared source of truth for sidenav, dropdown, etc.). After a successful profile mutation, dispatch `setCurrentUserAction`:

```ts
// Already wired in UseUpdateAccount and UseUpdateAvatar:
if (updateAccountAction.fulfilled.match(result)) {
    dispatch(setCurrentUserAction(result.payload));
}
```

`setCurrentUserAction` lives at `@/platform/session/presentation/store/currentuser.action` and dispatches `sessionSlice.actions.currentUser(payload)`. No new reducer is needed on the auth slice.

---

## Verification Checklist

### Profile Tab

- [ ] Profile data loads on page mount and syncs to `session.currentUser`
- [ ] Avatar displays correctly (image or initials fallback)
- [ ] Avatar upload: file picker opens, upload works, avatar updates in both settings and sidebar via `setCurrentUserAction`
- [ ] Avatar upload failure: toast appears using the backend's `Failure.title` / `Failure.detail`
- [ ] Profile fetch failure: `<ErrorAlert>` shows with retry via `onClose={fetchProfile}`
- [ ] Account info modal: opens, pre-populates, country picker works with search, phone prefix updates on country change, validates, submits (derives countryIsoCode/dialCode/flag from selected country), closes, updates display + sidebar
- [ ] Account info failure: inline `<ErrorAlert>` inside the modal shows the Failure

### Security Tab

- [ ] Change password form: validates on blur/submit, submits, resets on success, shows inline `<ErrorAlert>` on failure
- [ ] Roles & permissions: loads on tab switch, displays collapsible panels with permission tables
- [ ] Roles fetch failure: `<ErrorAlert onClose={fetchRoles}>` visible above `StateRenderer`
- [ ] Sessions: loads active sessions, displays cards with full info, revoke with confirmation works
- [ ] Sessions fetch failure: `<ErrorAlert onClose={fetchSessions}>` visible above `StateRenderer`
- [ ] Revoke failure: toast appears with backend's title/detail

### Notification Tab

- [ ] Coming soon placeholder renders centered with icon + text

### Account Tab

- [ ] Sign out: confirmation modal, API call, clears persisted state, redirects to login
- [ ] Sign out failure: toast with backend error (still logs out — graceful)
- [ ] Sign out all: confirmation modal with danger button, API call, clears state, redirects to login
- [ ] Sign out all failure: toast with backend error (does **not** log out)

### Cross-Cutting

- [ ] Tab navigation works (all 4 tabs switch correctly)
- [ ] No console errors on any tab
- [ ] Every error shown to the user is the backend's `Failure.title` / `Failure.detail` — no hardcoded error messages
- [ ] Loading states show spinners/skeletons where expected
- [ ] Settings slice is NOT persisted to localStorage
