# Settings — API Endpoints

All endpoints are defined in `src/shared/api/generated/116.api.ts`.

All requests are authenticated (JWT Bearer token via security worker).

---

## Admin Profile Endpoints

### GET `/api/v1/admin/me/profile`

Retrieve the authenticated admin user's complete profile.

**API method**: `apiClient.api.adminGetOwnProfile()`

**Response** — `AdminGetOwnProfileResponse`:
```ts
{
  user: UserResponseDto;
}
```

**Used in**: Profile tab — initial data load. Result is stored in `settings.profile` and also synced to `auth.login.data.user` to keep sidenav/dropdown current.

---

### PATCH `/api/v1/admin/me/profile`

Update the authenticated admin user's own profile information.

**API method**: `apiClient.api.adminUpdateOwnProfile(data)`

**Request body** — `AdminUpdateOwnProfileRequest`:
```ts
{
  userName?: string | null;
  countryName?: string | null;
  partialPhoneNumber?: string | null;
  countryIsoCode?: string | null;
  countryDialCode?: string | null;
}
```

**Response** — `AdminUpdateOwnProfileResponse`:
```ts
{
  user: UserResponseDto;
}
```

**Used in**: Profile tab — account info modal. Result synced to `auth.login.data.user`.

---

### PATCH `/api/v1/admin/me/avatar`

Update admin user avatar via file upload.

**API method**: `apiClient.api.adminUpdateAvatar(data)`

**Request body** — `multipart/form-data`:
```ts
{
  avatarFile: File;  // @format binary
}
```

**Response** — `AdminUpdateAvatarResponse`:
```ts
{
  user: UserResponseDto;
}
```

**Used in**: Profile tab — avatar upload

---

### GET `/api/v1/admin/me/roles`

Retrieve the authenticated admin's roles with their permissions.

**API method**: `apiClient.api.adminGetOwnRoles()`

**Response** — `AdminGetOwnRolesResponse`:
```ts
{
  roles: RoleWithPermissionsDto[];
}
```

**Used in**: Security tab — roles & permissions display

---

## Admin Auth Endpoints

### POST `/api/v1/admin/auth/sign-out`

Sign out the authenticated admin user from the current device.

**API method**: `apiClient.api.adminSignOut(data)`

**Request body** — `AdminSignOutRequest`:
```ts
{
  refreshToken: string;
}
```

**Response** — `AdminSignOutResponse`:
```ts
{
  isSuccess: boolean;
}
```

**Used in**: Account tab — sign out button

---

### POST `/api/v1/admin/auth/sign-out-all`

Sign out the authenticated admin user from all devices.

**API method**: `apiClient.api.adminSignOutFromAllDevices()`

**Request body**: None

**Response** — `AdminSignOutFromAllDevicesResponse`:
```ts
{
  isSuccess: boolean;
}
```

**Used in**: Account tab — sign out from all devices button

---

### PATCH `/api/v1/admin/auth/change-password`

Change admin user password with current password verification.

**API method**: `apiClient.api.adminChangePassword(data)`

**Request body** — `AdminChangePasswordRequest`:
```ts
{
  oldPassword: string;
  newPassword: string;
}
```

**Response** — `AdminChangePasswordResponse`:
```ts
{
  isSuccess: boolean;
}
```

**Used in**: Security tab — change password form

---

## Public Session Endpoints

These endpoints operate on the authenticated user's sessions. Used by the dashboard for session management.

### GET `/api/v1/public/me/sessions`

Retrieve all sessions for the authenticated user.

**API method**: `apiClient.api.adminGetOwnSessions(query?)`

**Query parameters**:
```ts
{
  isActive?: boolean;  // Filter by active status
}
```

**Response** — `PublicGetOwnSessionsResponse`:
```ts
{
  sessions: SessionDto[];
}
```

**Used in**: Security tab — sessions list

---

### GET `/api/v1/public/me/sessions/{id}`

Retrieve a specific session by ID.

**API method**: `apiClient.api.adminGetOwnSessionById(id)`

**Path parameters**: `id: string` (UUID)

**Response** — `PublicGetOwnSessionByIdResponse`:
```ts
{
  session: SessionDto;
}
```

**Used in**: Not directly used in UI — available for session detail view if needed

---

### POST `/api/v1/public/me/sessions/revoke/{id}`

Revoke a specific session (log out from a device).

**API method**: `apiClient.api.adminRevokeSession(id)`

**Path parameters**: `id: string` (UUID)

**Request body**: None

**Response** — `PublicRevokeSessionResponse`:
```ts
{
  isSuccess: boolean;
}
```

**Used in**: Security tab — revoke session button

---

## Shared DTOs

### UserResponseDto

```ts
interface UserResponseDto {
  createdAt?: string | null;        // ISO 8601
  createdBy?: string | null;
  updatedAt?: string | null;        // ISO 8601
  updatedBy?: string | null;
  id: string;                       // UUID
  email?: string | null;
  userName: string;
  roles: RoleDto[];
  permissions: PermissionDto[];
  authProvider: "Local" | "Google" | "Facebook";
  isVerified: boolean;
  isActive: boolean;
  avatar?: FileDto | null;
  countryName?: string | null;
  countryIsoCode?: string | null;
  countryDialCode?: string | null;
  partialPhoneNumber?: string | null;
  fullPhoneNumber?: string | null;
}
```

### RoleWithPermissionsDto

```ts
interface RoleWithPermissionsDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;                       // UUID
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
  permissions: PermissionDto[];
}
```

### RoleDto

```ts
interface RoleDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
}
```

### PermissionDto

```ts
interface PermissionDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;
  resource: string;
  action: string;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
}
```

### FileDto

```ts
interface FileDto {
  id: string;
  fileName: string;
  originalFileName: string;
  mimeType: string;
  storageUrl: string;
  sizeInBytes: number;
  isDeleted: boolean;
}
```

### SessionDto

```ts
interface SessionDto {
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  id: string;                       // UUID
  ipAddress?: string | null;
  userAgent?: string | null;
  browser: "Chrome" | "InternetExplorer" | "Safari" | "Firefox" | "Edge" | "Opera" | "GoogleSearchApp" | "Samsung" | "Unknown";
  device: "Desktop" | "Tablet" | "Mobile" | "Watch" | "Tv" | "Console" | "Car" | "IoT" | "Unknown";
  platform: "Windows" | "Mac" | "Ios" | "IpadOs" | "Linux" | "Android" | "ChromeOs" | "Unknown";
  client: "MobileApp" | "WebApp" | "Dashboard" | "Unknown";
  expiresAt: string;               // ISO 8601
  isActive: boolean;
}
```

---

## Error Handling

All endpoints return `ProblemDetails` on error, which is mapped by the API client's `errorHandler` to `IApiProblemDetails`:

```ts
interface IApiProblemDetails {
  title: string;
  detail: string;
  status: number;
  errors?: Record<string, string[]>;
}
```

The existing error handler in `shared/api/client.ts` handles:

- **401/403**: Clears auth state, redirects to login
- **Validation errors**: Normalizes first error message
- **Other errors**: Maps exception codes to user-friendly titles
- **Network errors**: Returns generic "Network Error" message
