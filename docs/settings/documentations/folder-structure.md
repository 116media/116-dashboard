# Settings — Folder Structure

## Overview

The settings module follows the same **Clean Architecture** structure as the auth module. File naming uses **lowercase with dots** for files and **PascalCase** for component folders.

---

## Complete File Tree

```
src/platform/settings/
│
├── domain/
│   └── entities/
│       ├── IProfile.ts                          # Profile entity (mapped from UserResponseDto)
│       ├── IRoleWithPermissions.ts              # Role with nested permissions entity
│       └── IChangePasswordResponse.ts           # Change password response entity
│
# Note: ISession and IRevokeSessionResponse live in src/platform/session/domain/entities/
# because sessions are shared with the session module (used by both settings and the
# access-token-expiry interceptor flow).
│
├── application/
│   ├── repositories/
│   │   └── settings.repository.port.ts          # Repository interface contract
│   └── usecases/
│       ├── getprofile.usecase.ts                 # GET /admin/me/profile
│       ├── updateaccount.usecase.ts              # PATCH /admin/me/profile (account fields)
│       ├── updateavatar.usecase.ts               # PATCH /admin/me/avatar
│       ├── changepassword.usecase.ts             # PATCH /admin/auth/change-password
│       ├── getroles.usecase.ts                   # GET /admin/me/roles
│       ├── getsessions.usecase.ts                # GET /public/me/sessions
│       ├── revokesession.usecase.ts              # POST /public/me/sessions/revoke/{id}
│       ├── signout.usecase.ts                    # POST /admin/auth/sign-out
│       └── signoutall.usecase.ts                 # POST /admin/auth/sign-out-all
│
├── infrastructure/
│   ├── repositories/
│   │   └── settings.repository.impl.ts          # Repository implementation (API calls)
│   ├── mappers/
│   │   └── settings.mapper.ts                   # DTO → domain entity mapping
│   └── constants/
│       └── api.ts                               # API route constants (optional)
│
└── presentation/
    ├── store/
    │   ├── index.ts                             # Slice definition (createSlice)
    │   ├── type.ts                              # ISettingsState type
    │   ├── state.ts                             # settingsInitialState
    │   ├── constants.ts                         # ActionType & SliceName constants
    │   ├── profile.action.ts                    # getProfile, updateAccount, updateAvatar thunks
    │   ├── security.action.ts                   # changePassword, getRoles, getSessions, revokeSession thunks
    │   └── account.action.ts                    # signOut, signOutAll thunks
    │
    ├── model/
    │   ├── IUpdateAccountCredentials.ts          # Account info form model
    │   └── IChangePasswordCredentials.ts         # Change password form model
    │
    ├── utils/
    │   ├── validators/
    │   │   ├── settings.validator.ts            # Profile form validators
    │   │   └── changepassword.validator.ts      # Change password form validators
    │   └── notification/
    │       └── settings.notification.ts         # Notification configs
    │
    ├── hooks/
    │   ├── UseProfile.ts                        # Fetch profile data
    │   ├── UseUpdateAccount.ts                  # Account info modal form logic
    │   ├── UseUpdateAvatar.ts                   # Avatar upload logic
    │   ├── UseChangePassword.ts                 # Change password form logic
    │   ├── UseRoles.ts                          # Fetch roles & permissions
    │   ├── UseSessions.ts                       # Fetch sessions & revoke
    │   ├── UseSignOut.ts                        # Sign out current device
    │   └── UseSignOutAll.ts                     # Sign out all devices
    │
    ├── components/
    │   ├── ui/
    │   │   ├── SettingsSidebar/
    │   │   │   ├── index.tsx                    # Tab navigation sidebar
    │   │   │   └── index.module.scss            # Sidebar styles
    │   │   ├── SettingsCard/
    │   │   │   ├── index.tsx                    # Reusable card with title + edit button
    │   │   │   └── index.module.scss
    │   │   ├── SettingsField/
    │   │   │   ├── index.tsx                    # Read-only label + value pair
    │   │   │   └── index.module.scss
    │   │   ├── SessionCard/
    │   │   │   ├── index.tsx                    # Single session display card
    │   │   │   └── index.module.scss
    │   │   ├── RoleCard/
    │   │   │   ├── index.tsx                    # Collapsible role + permissions card
    │   │   │   └── index.module.scss
    │   │   └── ComingSoon/
    │   │       ├── index.tsx                    # Coming soon placeholder
    │   │       └── index.module.scss
    │   └── forms/
    │       ├── ChangePasswordForm/
    │       │   ├── index.tsx                    # Inline change password form
    │       │   └── index.module.scss
    │       └── AccountInfoModal/
    │           ├── index.tsx                    # Account info edit modal form
    │           └── index.module.scss
    │
    ├── containers/
    │   ├── ProfileContainer/
    │   │   └── index.tsx                        # Wires profile hooks → profile components
    │   ├── SecurityContainer/
    │   │   └── index.tsx                        # Wires security hooks → security components
    │   ├── NotificationContainer/
    │   │   └── index.tsx                        # Renders ComingSoon
    │   └── AccountContainer/
    │       └── index.tsx                        # Wires account hooks → account components
    │
    └── pages/
        └── SettingsPage/
            ├── index.tsx                        # Settings page with sidebar + content
            └── index.module.scss
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
| --- | --- | --- |
| Domain entity | `I` prefix, PascalCase | `IProfile.ts`, `ISession.ts` |
| Repository port | `{module}.repository.port.ts` | `settings.repository.port.ts` |
| Repository impl | `{module}.repository.impl.ts` | `settings.repository.impl.ts` |
| Use case | `{action}.usecase.ts` | `getprofile.usecase.ts` |
| Mapper | `{module}.mapper.ts` | `settings.mapper.ts` |
| Redux slice | `index.ts` in store folder | `store/index.ts` |
| Redux state type | `type.ts` | `store/type.ts` |
| Redux initial state | `state.ts` | `store/state.ts` |
| Redux constants | `constants.ts` | `store/constants.ts` |
| Action file | `{feature}.action.ts` | `profile.action.ts` |
| Validator | `{feature}.validator.ts` | `changepassword.validator.ts` |
| Notification | `{module}.notification.ts` | `settings.notification.ts` |
| Hook | `Use{Name}.ts` (PascalCase) | `UseProfile.ts` |
| Presentation model | `I{Name}Credentials.ts` | `IChangePasswordCredentials.ts` |
| Component | `index.tsx` inside PascalCase folder | `ChangePasswordForm/index.tsx` |
| Styles | `index.module.scss` alongside component | `ChangePasswordForm/index.module.scss` |

### Folders

| Type | Convention | Example |
| --- | --- | --- |
| Component folder | PascalCase | `ChangePasswordForm/` |
| Architecture layer | lowercase | `domain/`, `application/`, `infrastructure/`, `presentation/` |
| Grouping folder | lowercase | `entities/`, `usecases/`, `repositories/`, `hooks/` |

---

## Key Architectural Patterns

### 1. Dependency Flow

```
Presentation → Application → Domain
     ↓              ↓
Infrastructure (implements Application ports)
```

- **Domain** has no dependencies
- **Application** depends only on Domain
- **Infrastructure** implements Application interfaces, depends on API client
- **Presentation** depends on Application (via use cases) and Infrastructure (instantiation)

### 2. Container / Component Split

- **Containers**: Smart components that wire hooks to presentational components
- **Components**: Dumb components that receive props and render UI
- **Hooks**: Encapsulate all business logic, Redux interactions, and side effects

### 3. One Hook Per Operation

Each distinct user action gets its own hook file. Hooks return typed interfaces. This keeps each hook focused and testable.

### 4. Mapper Layer

All API DTOs are mapped to domain entities in the infrastructure mapper. Presentation layer never sees raw DTOs.

---

## Integration Points

### Root Reducer

Add settings reducer in `src/shared/presentation/store/root.reducer.ts`:

```ts
import settingsReducer from "@/platform/settings/presentation/store";

const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    settings: settingsReducer,
});
```

### Root State Type

The `IRootState` type in `root.reducer.ts` automatically picks up the new settings slice via `ReturnType<typeof rootReducer>`.

### Routes

No route changes needed — the settings page already exists at `SETTING_PATH` (`/settings`). The internal tab navigation is managed within the page component.
