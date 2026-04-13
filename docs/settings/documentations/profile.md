# Settings — Profile Tab

## Overview

The **Profile** tab displays the authenticated admin's profile information organized into two cards:

1. **Avatar Card** — Profile photo with upload capability
2. **Account Information Card** — All profile fields (read-only display, modal edit)

---

## Layout

```
┌──────────────────────────────────────────────────────┐
│  Profil                                               │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Avatar Card                                    │  │
│  │  ┌──────┐  User Name              [Modifier]   │  │
│  │  │ IMG  │  Primary Role                         │  │
│  │  │      │  Location                             │  │
│  │  └──────┘                                       │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Informations du compte              [Modifier]│  │
│  │                                                │  │
│  │  Nom d'utilisateur    Adresse e-mail           │  │
│  │  {userName}           {email}                  │  │
│  │                                                │  │
│  │  Pays                 Téléphone                │  │
│  │  {countryName}        {dialCode} {phonePartial}│  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 1. Avatar Card

### Display

| Element | Source | Description |
| --- | --- | --- |
| Avatar image | `user.avatar.storageUrl` | Circular avatar, fallback to initials if null |
| User name | `user.userName` | Bold primary text |
| Primary role | `user.roles[0].name` | Muted secondary text |
| Location | `user.countryName` | Muted secondary text, optional |

### Edit Action

The "Modifier" button on the avatar card triggers a **file upload** — not a modal form.

- **Endpoint**: `PATCH /api/v1/admin/me/avatar`
- **API method**: `apiClient.api.adminUpdateAvatar({ avatarFile })`
- **Input**: File picker (accept: `image/*`)
- **Request**: `Content-Type: multipart/form-data` with `avatarFile` field
- **Response**: `AdminUpdateAvatarResponse { user: UserResponseDto }`
- **On success**: Update the user in the Redux auth store (`auth.login.data.user`)

### Avatar Upload Flow

1. User clicks "Modifier" on avatar card
2. Native file picker opens (filtered to images)
3. On file selection, dispatch `updateAvatarAction` with the `File` object
4. Show loading spinner on the avatar while uploading
5. On success: update user in Redux store, show success notification
6. On error: show error notification

---

## 2. Account Information Card

### Display Fields

| Field Label (FR) | Source | Editable |
| --- | --- | --- |
| Nom d'utilisateur | `user.userName` | Yes (via modal) |
| Adresse e-mail | `user.email` | **No** — read-only, displayed but not editable |
| Pays | `user.countryName` | Yes (via modal) |
| Téléphone | `user.countryDialCode` + `user.partialPhoneNumber` | Yes (via modal) — displayed as "{dialCode} {partialPhone}", e.g. "+250 788123456" |

### Edit Action — Account Info Modal

The "Modifier" button opens a **single modal form** containing all editable fields (layout inspired by [modal-layout-only.webp](./assets/modal-layout-only.webp)).

#### Modal Structure

```
┌──────────────────────────────────────────────┐
│  Modifier les informations du compte          │
│                                              │
│  Adresse e-mail                              │
│  ┌──────────────────────────────────────┐    │
│  │ {email}                  (disabled)   │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Pseudo                                      │
│  ┌──────────────────────────────────────┐    │
│  │ {userName}                            │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Indicatif téléphonique                      │
│  ┌──────────────────────────────────────┐    │
│  │ 🇷🇼 Rwanda                    (+250) │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Téléphone                                   │
│  ┌──────────────────────────────────────┐    │
│  │ +250 │ 815252801                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│              [Annuler]  [Mettre à jour]       │
└──────────────────────────────────────────────┘
```

#### Modal Behavior

- **Title**: "Modifier les informations du compte"
- **Pre-filled**: All fields pre-populated with current values from auth Redux state
- **Email field**: Rendered as a disabled `Input` — visible but not editable
- **Country picker**: Ant Design `Select` with `showSearch`, populated from a `countryList` constant. Each option shows flag image + country name + dial code. Selecting a country auto-updates the phone input prefix. Default value from `user.countryName`.
- **Phone field**: `Input` with `prefix={country?.dialCode}` showing the dial code from the selected country. Only the partial phone number is entered.
- **Layout**: All fields full-width, vertical layout
- **Validation**: userName is required; country/phone fields are optional (nullable in API)
- **Cancel**: Closes modal, resets form to original values
- **Submit**: Dispatches `updateAccountAction` → calls `PATCH /api/v1/admin/me/profile`

#### Submit Logic

On form submit, the hook derives `countryIsoCode`, `countryDialCode`, and `countryFlagUrl` from the selected country object (looked up from `countryList` by `countryName`):

```ts
const countryFlag = String(country?.flag);
const phoneISOCode = String(country?.isoCode);
const phoneDialCode = String(country?.dialCode);
const { countryName, email, userName, phonePartial } = formData;

dispatch(updateAccountAction({
    email, userName, countryName,
    phonePartial, phoneISOCode, phoneDialCode, countryFlag
}));
```

#### Endpoint Details

- **API method**: `apiClient.api.adminUpdateOwnProfile(data)`
- **Request body** (`AdminUpdateOwnProfileRequest`):
  ```ts
  {
    userName?: string | null;
    countryName?: string | null;
    countryIsoCode?: string | null;
    countryDialCode?: string | null;
    partialPhoneNumber?: string | null;
  }
  ```
  Note: `email` is **never sent** — it is display-only in the modal. `countryIsoCode` and `countryDialCode` are derived from the selected country object, not from separate form fields.
- **Response**: `AdminUpdateOwnProfileResponse { user: UserResponseDto }`
- **On success**: Update user in auth Redux store (`auth.login.data.user`), close modal, show success notification
- **On error**: Display error in modal via `ErrorAlert`

---

## Data Loading

### Initial Load

On settings page mount (Profile tab active):

1. Dispatch `getProfileAction` → `GET /api/v1/admin/me/profile`
2. API method: `apiClient.api.adminGetOwnProfile()`
3. Response: `AdminGetOwnProfileResponse { user: UserResponseDto }`
4. Store in settings slice: `settings.profile`

### Data Sync with Auth Store

The settings page reads from `settings.profile.data`, but `auth.login.data.user` must be kept in sync so the sidenav, dropdown menu, and other components always show current data.

After every successful profile mutation (`getProfileAction`, `updateAccountAction`, `updateAvatarAction`), the hook dispatches `authSlice.actions.updateUser(updatedUser)` to sync `auth.login.data.user`.

This means:
- **Settings page** reads from `settings.profile.data` (fresh from API)
- **Sidenav / dropdown / other components** read from `auth.login.data.user` (synced after every profile operation)
- Both always reflect the same data

---

## Validators

### Account Info Validators (`settings.validator.ts`)

```ts
const SettingsValidator = {
    userName: (name: string): Rule[] => [
        ...ValidatorUtils.required(name),
        ...ValidatorUtils.minmax(name, { min: 2, max: 50 })
    ],
    countryName: (name: string): Rule[] => [
        ...ValidatorUtils.required(name)
    ],
    phonePartial: (name: string, dialCode?: string): Rule[] => [
        ...ValidatorUtils.numericOnly(name)
    ]
};
```

---

## Notifications

```ts
const SettingsNotification = {
    profileUpdateSuccess: {
        type: "success",
        message: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès."
    },
    avatarUpdateSuccess: {
        type: "success",
        message: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
    }
};
```
