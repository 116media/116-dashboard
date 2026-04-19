import { type FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { ResetPasswordForm } from "@/modules/auth/presentation/components/forms/ResetPasswordForm";
import { useResetPassword } from "@/modules/auth/presentation/hooks/UseResetPassword";
import { authSlice } from "@/modules/auth/presentation/store";
import { AuthNotification } from "@/modules/auth/presentation/utils/notification/auth.notification";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
import { useAppDispatch } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IResetPasswordContainerProps {
    email: string;
}

/**
 * Container component for the reset password form.
 *
 * @component
 *
 * @description
 * Wires the reset password hook to the presentational ResetPasswordForm component.
 * Manages side effects: resets state on mount, handles success notification,
 * purges auth flow states, and navigates to login on success.
 *
 * @param {IResetPasswordContainerProps} props - Container props
 * @param {string} props.email - User's email address for password reset
 *
 * @returns The reset password form container
 */
export const ResetPasswordContainer: FC<IResetPasswordContainerProps> = ({ email }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { form, onSubmit, loading, error, isSuccess, resetResetPassword } =
        useResetPassword(email);

    // biome-ignore lint/correctness/useExhaustiveDependencies: only want to run on mount
    useEffect(() => {
        resetResetPassword();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            showNotification(AuthNotification.passwordResetSuccess);

            dispatch(
                authSlice.actions.purge([
                    "forgotPassword",
                    "verifyOtp",
                    "resendOtp",
                    "resetPassword"
                ])
            );

            navigate(LOGIN_PATH);
        }
    }, [isSuccess, navigate, dispatch]);

    return <ResetPasswordForm form={form} loading={loading} error={error} onSubmit={onSubmit} />;
};
