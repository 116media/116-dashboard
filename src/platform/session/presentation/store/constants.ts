/**
 * Redux action type constants for the session module.
 */
export const ActionType = {
    SessionCurrentUser: "session/currentUser",
    SessionGetSessions: "session/sessions",
    SessionRevokeSession: "session/revokeSession"
} as const;

/**
 * Redux slice name for the session module.
 */
export const SliceName = {
    Session: "session"
} as const;
