# Phase 10: Integration

Wire the settings module into the application's global state and verify everything works end-to-end.

**Ref**: [redux-store.md](../../documentations/redux-store.md) (Root Reducer Integration, Auth Slice Sync)

---

## Modify `src/core/presentation/store/root.reducer.ts`

- [ ] Import `settingsReducer` from `@/modules/settings/presentation/store`
- [ ] Add `settings: settingsReducer` to `combineReducers`
- [ ] Verify `IRootState` type automatically includes `settings` (via `ReturnType<typeof rootReducer>`)
- [ ] Confirm `settings` is **NOT** added to Redux persist whitelist (only `auth` is persisted)

---

## Modify `src/modules/auth/presentation/store/index.ts`

- [ ] Add `updateUser` reducer to auth slice:
  ```ts
  updateUser: (state, action: PayloadAction<IUser>) => {
      if (state.login.data) {
          state.login.data.user = action.payload;
      }
  }
  ```
- [ ] Export the new action: `authSlice.actions.updateUser`
- [ ] This is called by `UseUpdateAccount` and `UseUpdateAvatar` hooks after successful profile mutations to keep sidebar/header user info in sync

---

## Verification Checklist

### Profile Tab

- [ ] Profile data loads on page mount and syncs to `auth.login.data.user`
- [ ] Avatar displays correctly (image or initials fallback)
- [ ] Avatar upload: file picker opens, upload works, avatar updates in both settings and sidebar (auth sync)
- [ ] Account info displays 4 fields (userName, email, countryName, combined phone)
- [ ] Account info modal: opens, pre-populates, country picker works with search, phone prefix updates on country change, validates, submits (derives countryIsoCode/dialCode/flag from selected country), closes, updates display + sidebar

### Security Tab

- [ ] Change password form: validates on blur/submit, submits, resets on success, shows errors
- [ ] Roles & permissions: loads on tab switch, displays collapsible panels with permission tables
- [ ] Sessions: loads active sessions, displays cards with full info, revoke with confirmation works

### Notification Tab

- [ ] Coming soon placeholder renders centered with icon + text

### Account Tab

- [ ] Sign out: confirmation modal, API call, clears auth, redirects to login
- [ ] Sign out all: confirmation modal with danger button, API call, clears auth, redirects to login

### Cross-Cutting

- [ ] Tab navigation works (all 4 tabs switch correctly)
- [ ] No console errors on any tab
- [ ] Error states display correctly (ErrorAlert, notification toasts)
- [ ] Loading states show spinners/skeletons where expected
- [ ] Settings slice is NOT persisted to localStorage
