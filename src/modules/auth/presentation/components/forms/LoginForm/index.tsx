import type { FormInstance } from "antd";
import { Button, Form, Input } from "antd";
import type { FC } from "react";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import { LoginValidator } from "@/modules/auth/presentation/utils/validators/login.validator";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { FORGOT_PASSWORD_PATH } from "@/shared/infrastructure/constants/paths";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconLockOutlined, IconMailOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Item } = Form;
const { Password } = Input;

export interface ILoginFormProps {
    form: FormInstance<ILoginCredentials>;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    onSubmit: (values: ILoginCredentials) => void;
}

/**
 * Presentational login form component.
 *
 * @component
 *
 * @description
 * Renders the login form with email and password fields.
 * Includes form validation, error display, and loading states.
 *
 * @param {ILoginFormProps} props - Component props
 * @param {FormInstance} props.form - Ant Design form instance
 * @param {boolean} props.loading - Whether login is in progress
 * @param {IApiProblemDetails | null} props.error - Login error if any
 * @param {Function} props.onSubmit - Form submission handler
 *
 * @returns The login form
 */
export const LoginForm: FC<ILoginFormProps> = ({
    form,
    loading,
    error,
    onSubmit
}: ILoginFormProps) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            name="admin_login"
            onFinish={onSubmit}
            className={styles.loginForm}
        >
            <Item
                name="email"
                label="Adresse e-mail"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={LoginValidator.email("Adresse e-mail")}
            >
                <Input prefix={<IconMailOutlined />} placeholder="Adresse e-mail" />
            </Item>

            <Item
                name="password"
                label="Mot de passe"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={LoginValidator.password("Mot de passe")}
            >
                <Password
                    visibilityToggle
                    autoComplete="new-password"
                    placeholder="••••••••••••••"
                    prefix={<IconLockOutlined />}
                />
            </Item>

            <Item className={styles.loginForm__forgotPasswordButton}>
                <Button type="link" block size="small" href={FORGOT_PASSWORD_PATH}>
                    Mot de passe oublié?
                </Button>
            </Item>

            <ErrorAlert error={error} showIcon closable banner={false} />

            <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.loginForm__submitButton}
            >
                Connexion
            </Button>
        </Form>
    );
};
