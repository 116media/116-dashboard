/**
 * Redux action type constants for the settings module.
 */
export const ActionType = {
    SettingsGetProfile: "settings/profile",
    SettingsUpdateAccount: "settings/updateAccount",
    SettingsUpdateAvatar: "settings/updateAvatar",
    SettingsChangePassword: "settings/changePassword",
    SettingsGetRoles: "settings/roles"
} as const;

/**
 * Redux slice name for the settings module.
 */
export const SliceName = {
    Settings: "settings"
} as const;
