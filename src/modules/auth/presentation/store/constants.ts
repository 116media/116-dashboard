/**
 * Redux action type constants for auth module.
 */
export const ActionType = {
    AuthLogin: "auth/login",
    AuthForgotPassword: "auth/forgotPassword",
    AuthVerifyOtp: "auth/verifyOtp",
    AuthResendOtp: "auth/resendOtp",
    AuthResetPassword: "auth/resetPassword",
    AuthSignOut: "auth/signOut",
    AuthSignOutAll: "auth/signOutAll"
};

/**
 * Redux slice name constants for auth module.
 */
export const SliceName = {
    Auth: "auth"
};
