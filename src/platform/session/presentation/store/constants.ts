export const ActionType = {
    SessionCurrentUser: "session/currentUser",
    SessionGetSessions: "session/sessions",
    SessionRevokeSession: "session/revokeSession"
} as const;

export const SliceName = {
    Session: "session"
} as const;
