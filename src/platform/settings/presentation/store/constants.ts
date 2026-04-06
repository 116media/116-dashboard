export const ActionType = {
    SettingsGetProfile: "settings/profile",
    SettingsUpdateAccount: "settings/updateAccount",
    SettingsUpdateAvatar: "settings/updateAvatar",
    SettingsChangePassword: "settings/changePassword",
    SettingsGetRoles: "settings/roles"
} as const;

export const SliceName = {
    Settings: "settings"
} as const;
