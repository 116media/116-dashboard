import { type FC, useEffect } from "react";
import { ForgotPasswordForm } from "@/modules/auth/presentation/components/forms/ForgotPasswordForm";
import { useForgotPassword } from "@/modules/auth/presentation/hooks/UseForgotPassword";

/**
 * Container component for the forgot password form.
 *
 * @component
 *
 * @description
 * Wires the forgot password hook to the presentational ForgotPasswordForm component.
 * Manages side effects: resets forgot password state on mount.
 *
 * @returns The forgot password form container
 */
export const ForgotPasswordContainer: FC = () => {
    const { form, onSubmit, loading, error, resetForgotPassword } = useForgotPassword();

    // biome-ignore lint/correctness/useExhaustiveDependencies: only want to run on mount
    useEffect(() => {
        resetForgotPassword();
    }, []);

    return <ForgotPasswordForm form={form} loading={loading} error={error} onSubmit={onSubmit} />;
};
