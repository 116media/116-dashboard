# Phase 6: Presentation Utilities

Form credential models, validators, and notification configuration. No dependencies on other phases — can be built in parallel.

**Ref**: [ui-components.md](../../documentations/ui-components.md), [field-specifications.md](../../documentations/field-specifications.md)

**Pattern reference**: `src/modules/auth/presentation/utils/validators/`, `src/modules/auth/presentation/model/`

---

## `src/modules/settings/presentation/model/IUpdateAccountCredentials.ts`

- [ ] Define `IUpdateAccountCredentials` interface:
  ```ts
  email: string
  userName: string
  countryName?: string | null
  countryFlag?: string | null
  phonePartial?: string | null
  phoneISOCode?: string | null
  phoneDialCode?: string | null
  ```
- [ ] Note: `countryFlag`, `phoneISOCode`, `phoneDialCode` are derived from the selected country object on submit, not from separate form fields

---

## `src/modules/settings/presentation/model/IChangePasswordCredentials.ts`

- [ ] Define `IChangePasswordCredentials` interface:
  ```ts
  oldPassword: string
  newPassword: string
  confirmPassword: string  // frontend-only, not sent to API
  ```

---

## `src/modules/settings/presentation/utils/validators/settings.validator.ts`

- [ ] Export `SettingsValidator` object
- [ ] `userName(name)`: required, min 2, max 50 — use `ValidatorUtils.required` + `ValidatorUtils.minmax`
- [ ] `countryName(name)`: required — use `ValidatorUtils.required`
- [ ] `phonePartial(name, dialCode?)`: numeric only — use `ValidatorUtils.numericOnly`
- [ ] Import `ValidatorUtils` from `@/shared/lib/utils/validators/validators.utils`
- [ ] Import `Rule` from `antd/es/form`

---

## `src/modules/settings/presentation/utils/validators/changepassword.validator.ts`

- [ ] Export `ChangePasswordValidator` object
- [ ] `oldPassword(name)`: required
- [ ] `newPassword(name)`: required + regex `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$` with French error message
- [ ] `confirmPassword(name)`: custom validator using `getFieldValue("newPassword")` for cross-field match, French error messages
- [ ] Reuse the pattern from `ResetPasswordValidator` if it exists in auth module

---

## `src/modules/settings/presentation/utils/notification/settings.notification.ts`

- [ ] Export `SettingsNotification` record with 5 entries (all French):
  - `profileUpdateSuccess`: "Profil mis à jour" / "Vos informations ont été mises à jour avec succès."
  - `avatarUpdateSuccess`: "Avatar mis à jour" / "Votre photo de profil a été mise à jour avec succès."
  - `changePasswordSuccess`: "Mot de passe modifié" / "Votre mot de passe a été modifié avec succès."
  - `sessionRevokeSuccess`: "Session révoquée" / "L'appareil a été déconnecté avec succès."
  - `signOutError`: type "error" / "Erreur de déconnexion" / "Une erreur est survenue lors de la déconnexion. Veuillez réessayer."
- [ ] Import `INotificationConfig` from `@/shared/lib/utils/notification/notification.utils`
