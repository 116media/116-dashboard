import { type FC, useEffect } from "react";
import { LoginForm } from "@/modules/auth/presentation/components/forms/LoginForm";
import { useLogin } from "@/modules/auth/presentation/hooks/UseLogin";

/**
 * Container component for the login form.
 *
 * @component
 *
 * @description
 * Wires the login hook to the presentational LoginForm component.
 * Manages side effects: resets login state on mount.
 *
 * @returns The login form container
 */
export const LoginContainer: FC = () => {
    const { form, onSubmit, loading, error, resetLogin } = useLogin();

    // biome-ignore lint/correctness/useExhaustiveDependencies: only want to run on mount
    useEffect(() => {
        resetLogin();
    }, []);

    return <LoginForm form={form} loading={loading} error={error} onSubmit={onSubmit} />;
};
