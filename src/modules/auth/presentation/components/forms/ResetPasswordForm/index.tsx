import type { FormInstance } from "antd";
import { Button, Form, Input } from "antd";
import type { FC } from "react";
import { BackToLoginButton } from "@/modules/auth/presentation/components/ui/BackToLoginButton";
import FormHeader from "@/modules/auth/presentation/components/ui/FormHeader";
import { ResetPasswordValidator } from "@/modules/auth/presentation/utils/validators/resetpassword.validator";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconLockOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Item } = Form;
const { Password } = Input;

interface IResetPasswordFormValues {
    newPassword: string;
    confPassword: string;
}

export interface IResetPasswordFormProps {
    form: FormInstance<IResetPasswordFormValues>;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    onSubmit: (values: IResetPasswordFormValues) => void;
}

/**
 * Presentational reset password form component.
 *
 * @component
 *
 * @description
 * Renders the reset password form with new password and confirm password fields.
 * Includes form validation, error display, and loading states.
 *
 * @param {IResetPasswordFormProps} props - Component props
 * @param {FormInstance} props.form - Ant Design form instance
 * @param {boolean} props.loading - Whether reset is in progress
 * @param {IApiProblemDetails | null} props.error - Error if any
 * @param {Function} props.onSubmit - Form submission handler
 *
 * @returns The reset password form
 */
export const ResetPasswordForm: FC<IResetPasswordFormProps> = ({
    form,
    loading,
    error,
    onSubmit
}: IResetPasswordFormProps) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="admin_reset_password"
            className={styles.resetPasswordForm}
        >
            <FormHeader
                title="Réinitialiser le mot de passe"
                subtitle="Entrez votre nouveau mot de passe pour réinitialiser votre compte."
            />

            <Item
                name="newPassword"
                label="Nouveau mot de passe"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={ResetPasswordValidator.newPassword("Nouveau mot de passe")}
            >
                <Password
                    visibilityToggle
                    autoComplete="new-password"
                    placeholder="••••••••••••••"
                    prefix={<IconLockOutlined />}
                />
            </Item>

            <Item
                name="confPassword"
                label="Confirmer le mot de passe"
                validateTrigger={["onSubmit", "onBlur"]}
                dependencies={["newPassword"]}
                rules={ResetPasswordValidator.confPassword("Confirmer le mot de passe")}
            >
                <Password
                    visibilityToggle
                    autoComplete="new-password"
                    placeholder="••••••••••••••"
                    prefix={<IconLockOutlined />}
                />
            </Item>

            <ErrorAlert error={error} showIcon closable banner={false} />

            <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.resetPasswordForm__submitButton}
            >
                Réinitialiser
            </Button>

            <Item className={styles.resetPasswordForm__backToLogin}>
                <BackToLoginButton />
            </Item>
        </Form>
    );
};
