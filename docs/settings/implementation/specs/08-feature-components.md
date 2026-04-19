# Phase 8: Feature Components

Feature-specific form components that combine shared UI components with business logic props.

**Ref**: [field-specifications.md](../../documentations/field-specifications.md), [ui-components.md](../../documentations/ui-components.md), [security.md](../../documentations/security.md), [profile.md](../../documentations/profile.md)

> **Type note**: The `error` prop uses `Failure | null | undefined` (imported from `@/shared/domain/failures/failure`). It is passed directly to `<ErrorAlert error={error} />` — see [ui-components.md — Error Display Pattern](../../documentations/ui-components.md#error-display-pattern).

---

## `src/platform/settings/presentation/components/forms/ChangePasswordForm/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define props: `form: FormInstance`, `loading: boolean`, `error: Failure | null | undefined`, `onSubmit: (values: IChangePasswordCredentials) => void`
- [ ] Render inside `SettingsCard` with title "Changer le mot de passe"
- [ ] Ant Design `Form`: `layout="vertical"`, `size="large"`, `validateTrigger={["onSubmit", "onBlur"]}`
- [ ] Field 1 — Mot de passe actuel:
  - `Input.Password` with `visibilityToggle`, `prefix={<LockOutlined />}`
  - Placeholder: "••••••••••••••"
  - Rules: `ChangePasswordValidator.oldPassword`
- [ ] Field 2 — Nouveau mot de passe:
  - `Input.Password` with same styling
  - Rules: `ChangePasswordValidator.newPassword`
- [ ] Field 3 — Confirmer le mot de passe:
  - `Input.Password` with same styling
  - Rules: `ChangePasswordValidator.confirmPassword`
- [ ] `ErrorAlert` component between last field and submit button
- [ ] Submit button: "Mettre à jour", `type="primary"`, `htmlType="submit"`, `loading`
- [ ] SCSS: form spacing, button alignment right

---

## `src/platform/settings/presentation/components/forms/AccountInfoModal/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define props: `isOpen: boolean`, `onClose: () => void`, `form: FormInstance`, `loading: boolean`, `error: Failure | null | undefined`, `success: string | null`, `onSubmit: (values: IUpdateAccountCredentials) => void`, `user: IProfile | null`
- [ ] Use `CreateEditModal` wrapper (from `@/shared/presentation/ui/CreateEditModal`) instead of a raw Ant Design `Modal`:
  - `title="Modifier les informations du compte"`
  - `open={isOpen}`, `onCancel={onClose}`
  - `formContext="EDIT"`, `success={success}`, `onSuccessClose={onClose}`
  - `destroyOnClose`
  - Footer buttons ("Annuler" / "Mettre à jour") are provided by `CreateEditModal` — no custom footer div needed
- [ ] Ant Design `Form` inside `CreateEditModal`: `layout="vertical"`, `size="large"`
- [ ] Field 1 — Adresse e-mail (full width):
  - `Input`, **disabled**
  - No validation (not submitted)
- [ ] Field 2 — Pseudo (full width):
  - `Input`, placeholder "Nom d'utilisateur"
  - Rules: `SettingsValidator.userName`
- [ ] Field 3 — Indicatif téléphonique (full width):
  - Use shared `CountrySelect` component (from `@/shared/presentation/ui/CountrySelect`) instead of a hand-rolled `Select` with manual `Option` mapping
  - Rules: `SettingsValidator.countryName`
- [ ] Field 4 — Téléphone (full width):
  - `Input` with `prefix={country?.dialCode}`, placeholder "ex: 788123456"
  - Rules: `SettingsValidator.phonePartial`
- [ ] `ErrorAlert` below form fields
- [ ] `useEffect`: pre-populate form when `isOpen` and `user` change via `form.setFieldsValue` (userName, email, countryName, phonePartial mapped from `user.partialPhoneNumber`)
- [ ] SCSS: any modal-specific overrides (most layout is handled by `CreateEditModal`)
