# Settings — UI Components

## Overview

This document describes the UI component patterns for the settings module, including the modal form pattern, shared components, and validators. All patterns are derived from the existing auth module and the design references.

---

## Modal Form Pattern

Modal forms are used for editing **account information** on the Profile tab. The layout is inspired by [modal-layout-only.webp](./assets/modal-layout-only.webp).

### Modal Anatomy

```
┌─────────────────────────────────────────────────────┐
│  Modal Title                                    [✕]  │
│─────────────────────────────────────────────────────│
│                                                     │
│  [Form fields — vertical layout, two-column grid]   │
│                                                     │
│  [ErrorAlert — shown on API error]                  │
│                                                     │
│─────────────────────────────────────────────────────│
│                        [Annuler]  [Mettre à jour]    │
└─────────────────────────────────────────────────────┘
```

### Modal Component Pattern

```tsx
// Ant Design Modal wrapping a Form
<Modal
    title="Modifier les informations du compte"
    open={isOpen}
    onCancel={onClose}
    footer={null}               // Custom footer inside form
    destroyOnClose              // Reset form on close
    width={520}
>
    <Form
        form={form}
        size="large"
        layout="vertical"
        onFinish={onSubmit}
    >
        {/* Form fields */}

        <ErrorAlert error={error} showIcon closable banner={false} />

        <div className={styles.modalFooter}>
            <Button onClick={onClose}>Annuler</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
                Mettre à jour
            </Button>
        </div>
    </Form>
</Modal>
```

### Key Decisions

- **`footer={null}`**: Custom footer inside the Form allows the submit button to trigger form validation
- **`destroyOnClose`**: Ensures form state resets when modal closes
- **`size="large"`**: Consistent with auth forms
- **`layout="vertical"`**: Labels above inputs, matching auth module convention
- **Two-column grid**: Use Ant Design `Row` + `Col` with `span={12}` for side-by-side fields

### Form Pre-Population

When opening an edit modal, pre-populate from the current profile data:

```tsx
useEffect(() => {
    if (isOpen && user) {
        form.setFieldsValue({
            userName: user.userName,
            // ...other fields
        });
    }
}, [isOpen, user, form]);
```

---

## Confirmation Modal Pattern

Used for destructive actions (revoke session, sign out, sign out all).

```tsx
Modal.confirm({
    title: "Confirmer l'action",
    content: "Êtes-vous sûr de vouloir révoquer cette session ?",
    okText: "Confirmer",
    cancelText: "Annuler",
    okButtonProps: { danger: true },
    onOk: () => handleRevoke(sessionId),
});
```

---

## Error Display Pattern

All API errors surface to the user via the backend's `Failure.title` and `Failure.detail`. **Never hardcode error titles or descriptions** — always use the values the server returned.

There are three canonical patterns depending on the operation type:

### 1. Forms — inline `<ErrorAlert>`

Form components receive `error: Failure | null | undefined` as a prop and render `<ErrorAlert>` inline above the submit button. The hook exposes `error` from Redux state, and the form renders whatever is there.

```tsx
<ErrorAlert error={error} banner={false} showIcon closable />
```

Used by: `LoginForm`, `ForgotPasswordForm`, `VerifyOtpForgotPasswordForm`, `ResetPasswordForm`, `ChangePasswordForm`, `AccountInfoModal`.

### 2. Fetches — `<ErrorAlert>` with retry

For data-loading operations (profile, roles, sessions), containers destructure `error` and `fetchX` from the hook and render `<ErrorAlert>` with `onClose={fetchX}` so the close button doubles as a retry button.

```tsx
const { roles, loading, error, fetchRoles } = useRoles();

<ErrorAlert error={error} banner showIcon closable onClose={fetchRoles} />
```

Used by: `ProfileContainer` (profile fetch), `SecurityContainer` (roles fetch, sessions fetch).

### 3. Non-form mutations — `showNotification` with backend fields

Mutations triggered from buttons or confirmation modals (revoke session, sign out, sign out all, avatar upload, resend OTP) have no form to attach an inline alert to. The hook checks `action.rejected.match(result)` and shows a toast built from the backend's typed `Failure`:

```ts
const result = await dispatch(revokeSessionAction(sessionId));

if (revokeSessionAction.fulfilled.match(result)) {
    showNotification(SettingsNotification.sessionRevokeSuccess);
} else if (revokeSessionAction.rejected.match(result) && result.payload) {
    showNotification({
        type: "error",
        title: result.payload.title,
        description: result.payload.detail
    });
}
```

Used by: `UseSessions.onRevoke`, `UseUpdateAvatar.onUpload`, `UseSignOut.onSignOut`, `UseSignOutAll.onSignOutAll`, `UseResendOtp.handleResendOtp`.

### Rule

> The only hardcoded messages in the notification module are **success** messages. Error messages always come from `result.payload.title` / `result.payload.detail` (which is a `Failure` produced by `ProblemMapper.toFailure()` in the repository).

The `<ErrorAlert>` component lives at `src/shared/presentation/ui/ErrorAlert/` and accepts `error: Failure | null | undefined`.

---

## Settings Page Component Structure

### Page-Level Layout

```tsx
// SettingsPage — renders sidebar + content area
const SettingsPage: FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

    return (
        <>
            <title>{`Paramètres - ${TextTransform.capitalCase(activeTab)} | ${APP_NAME}`}</title>
            <div className={styles.settingsPage}>
                <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />
                <SettingsContent activeTab={activeTab} />
            </div>
        </>
    );
};
```

### Tab Components

| Tab | Container | Description |
| --- | --- | --- |
| profile | `ProfileContainer` | Orchestrates avatar card and account info card |
| security | `SecurityContainer` | Orchestrates change password, roles, sessions sections |
| notification | `NotificationContainer` | Renders coming soon placeholder |
| account | `AccountContainer` | Renders sign out and sign out all cards |

---

## Shared UI Components

### SettingsSidebar

Vertical menu for tab navigation:

```tsx
const SETTINGS_TABS = [
    { key: "profile", label: "Profil", icon: <IconUserOutlined /> },
    { key: "security", label: "Sécurité", icon: <IconLockOutlined /> },
    { key: "notification", label: "Notifications", icon: <IconBellOutlined /> },
    { key: "account", label: "Compte", icon: <IconSettingOutlined /> },
];
```

Uses Ant Design `Menu` in `inline` mode.

### SettingsCard

Reusable card with title and optional edit button:

```tsx
interface ISettingsCardProps {
    title: string;
    onEdit?: () => void;
    editLabel?: string;      // Default: "Modifier"
    children: ReactNode;
}
```

### SettingsField

Read-only display field (label + value pair):

```tsx
interface ISettingsFieldProps {
    label: string;
    value?: string | null;
    fallback?: string;       // Default: "—"
}
```

### SessionCard

Card for displaying a single session:

```tsx
interface ISessionCardProps {
    session: ISession;
    loading: boolean;
    onRevoke: (id: string) => void;
}
```

### RoleCard

Collapsible card for displaying a role with its permissions:

```tsx
interface IRoleCardProps {
    role: IRoleWithPermissions;
}
```

---

## Hooks

Following the auth module pattern, each operation gets its own custom hook:

### Profile Hooks

| Hook | Purpose | Returns |
| --- | --- | --- |
| `useProfile` | Fetches and provides profile data | `{ profile, loading, error, fetchProfile }` |
| `useUpdateAccount` | Account info modal form logic | `{ form, loading, error, success, isOpen, open, close, onSubmit }` |
| `useUpdateAvatar` | Avatar upload logic | `{ loading, error, onUpload }` |

### Security Hooks

| Hook | Purpose | Returns |
| --- | --- | --- |
| `useChangePassword` | Change password form logic | `{ form, loading, error, onSubmit, resetChangePassword }` |
| `useRoles` | Fetches roles & permissions | `{ roles, loading, error, fetchRoles }` |
| `useSessions` | Fetches sessions, revokes | `{ sessions, loading, error, revokeLoading, fetchSessions, onRevoke }` |

### Account Hooks

| Hook | Purpose | Returns |
| --- | --- | --- |
| `useSignOut` | Sign out current device | `{ loading, onSignOut }` |
| `useSignOutAll` | Sign out all devices | `{ loading, onSignOutAll }` |

### Hook Pattern (Example)

```tsx
import type { Failure } from "@/shared/domain/failures/failure";

interface IUseChangePassword {
    form: FormInstance<IChangePasswordCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (values: IChangePasswordCredentials) => void;
    resetChangePassword: () => void;
}

export const useChangePassword = (): IUseChangePassword => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IChangePasswordCredentials>();

    const { error, loading } = useAppSelector(
        ({ settings: { changePassword } }) => changePassword
    );

    const onSubmit = async (values: IChangePasswordCredentials) => {
        const { oldPassword, newPassword } = values;
        const result = await dispatch(changePasswordAction({ oldPassword, newPassword }));

        if (changePasswordAction.fulfilled.match(result)) {
            form.resetFields();
            showNotification(SettingsNotification.changePasswordSuccess);
        }
        // On rejection the Failure is automatically stored in Redux state
        // and the form's <ErrorAlert error={error} /> renders it. No extra
        // work needed here — form errors use Pattern 1 from "Error Display Pattern".
    };

    const resetChangePassword = () => {
        dispatch(settingsSlice.actions.purge(["changePassword"]));
    };

    return { form, error, loading, onSubmit, resetChangePassword };
};
```

---

## Validators

### Settings Validator File

```ts
// File: src/platform/settings/presentation/utils/validators/settings.validator.ts

import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";
import type { Rule } from "antd/es/form";

export const SettingsValidator = {
    userName: (name: string): Rule[] => [
        ...ValidatorUtils.required(name),
        ...ValidatorUtils.minmax(name, { min: 2, max: 50 })
    ],

    countryName: (name: string): Rule[] => [
        ...ValidatorUtils.required(name)
    ],

    phonePartial: (name: string, dialCode?: string): Rule[] => [
        ...ValidatorUtils.numericOnly(name)
    ],
};
```

### Change Password Validator File

```ts
// File: src/platform/settings/presentation/utils/validators/changepassword.validator.ts

import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";
import type { Rule } from "antd/es/form";

export const ChangePasswordValidator = {
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

---

## Notifications

Only **success** notifications are declared here. Error notifications are built at call time from the backend's `Failure.title` / `Failure.detail` — see the "Error Display Pattern" section above.

```ts
// File: src/platform/settings/presentation/utils/notification/settings.notification.ts

import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

export const SettingsNotification = {
    profileUpdateSuccess: {
        type: "success",
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
    } as INotificationConfig,

    avatarUpdateSuccess: {
        type: "success",
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
    } as INotificationConfig,

    changePasswordSuccess: {
        type: "success",
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès."
    } as INotificationConfig,

    sessionRevokeSuccess: {
        type: "success",
        title: "Session révoquée",
        description: "L'appareil a été déconnecté avec succès."
    } as INotificationConfig
} as const;
```

---

## Presentation Models

```ts
// File: src/platform/settings/presentation/model/IUpdateAccountCredentials.ts
export interface IUpdateAccountCredentials {
    email: string;
    userName: string;
    countryName?: string | null;
    countryFlag?: string | null;
    phonePartial?: string | null;
    phoneISOCode?: string | null;
    phoneDialCode?: string | null;
}

// File: src/platform/settings/presentation/model/IChangePasswordCredentials.ts
export interface IChangePasswordCredentials {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;  // Frontend-only, not sent to API
}
```
