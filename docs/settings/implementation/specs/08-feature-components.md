# Phase 8: Feature Components

Feature-specific form components that combine shared UI components with business logic props.

**Ref**: [field-specifications.md](../../documentations/field-specifications.md), [ui-components.md](../../documentations/ui-components.md), [security.md](../../documentations/security.md), [profile.md](../../documentations/profile.md)

---

## `src/modules/settings/presentation/components/forms/ChangePasswordForm/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define props: `form: FormInstance`, `loading: boolean`, `error: IApiProblemDetails | null`, `onSubmit: (values: IChangePasswordCredentials) => void`
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

## `src/modules/settings/presentation/components/forms/AccountInfoModal/`

**Files**: `index.tsx` + `index.module.scss`

- [ ] Define props: `isOpen: boolean`, `onClose: () => void`, `form: FormInstance`, `loading: boolean`, `error: IApiProblemDetails | null`, `onSubmit: (values: IUpdateAccountCredentials) => void`, `user: IProfile | null`
- [ ] Ant Design `Modal`:
  - `title="Modifier les informations du compte"`
  - `open={isOpen}`, `onCancel={onClose}`
  - `footer={null}` (custom footer inside form)
  - `destroyOnClose`
  - `width={520}`
- [ ] Ant Design `Form` inside modal: `layout="vertical"`, `size="large"`
- [ ] Local state: `const [country, setCountry] = useState<ICountryObject>()`
- [ ] Watch country field: `const selectedCountryName = useWatch("countryName", form)`
- [ ] `useEffect` on `selectedCountryName`: find matching country from `countryList`, call `setCountry()`
- [ ] Field 1 — Adresse e-mail (full width):
  - `Input`, **disabled**
  - No validation (not submitted)
- [ ] Field 2 — Pseudo (full width):
  - `Input`, placeholder "Nom d'utilisateur"
  - Rules: `SettingsValidator.userName`
- [ ] Field 3 — Indicatif téléphonique (full width):
  - `Select` with `showSearch`, `optionLabelProp="label"`, `placeholder="Sélectionner un pays"`
  - Rules: `SettingsValidator.countryName`
  - Import `countryList` from shared constants
  - Map `countryList` → `Option` components:

    ```tsx
    <Option value={country.name} key={country.name} label={country.name}>
      <div className="d-flex justify-content-between">
        <span><img width={15} height={15} src={country.flag} alt={country.isoCode} /></span>
        <span className="mx-2 fw-medium">{truncate(country.name, { length: 35 })}</span>
        <span className="text-secondary">{country.dialCode}</span>
      </div>
    </Option>
    ```

- [ ] Field 4 — Téléphone (full width):
  - `Input` with `prefix={country?.dialCode}`, placeholder "ex: 788123456"
  - Rules: `SettingsValidator.phonePartial`
- [ ] `ErrorAlert` below form fields
- [ ] Custom footer:
  - "Annuler" Button (default) → `onClose`
  - "Mettre à jour" Button (primary, submit, loading)
- [ ] `useEffect`: pre-populate form when `isOpen` and `user` change via `form.setFieldsValue` (userName, email, countryName, phonePartial mapped from `user.partialPhoneNumber`)
- [ ] SCSS: modal footer layout (flex, justify-end, gap)
