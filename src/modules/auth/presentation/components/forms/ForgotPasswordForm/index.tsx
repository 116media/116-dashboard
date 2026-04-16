import type { FormInstance } from "antd";
import { Button, Form, Input } from "antd";
import type { FC } from "react";
import { BackToLoginButton } from "@/modules/auth/presentation/components/ui/BackToLoginButton";
import FormHeader from "@/modules/auth/presentation/components/ui/FormHeader";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import { ForgotPasswordValidator } from "@/modules/auth/presentation/utils/validators/forgotpassword.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconMailOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Item } = Form;

export interface IForgotPasswordFormProps {
    form: FormInstance<IForgotPasswordCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (values: IForgotPasswordCredentials) => void;
}

/**
 * Presentational forgot password form component.
 *
 * @component
 *
 * @description
 * Renders the forgot password form with email field.
 * Includes form validation, error display, and loading states.
 *
 * @param {IForgotPasswordFormProps} props - Component props
 * @param {FormInstance} props.form - Ant Design form instance
 * @param {boolean} props.loading - Whether request is in progress
 * @param {Failure | null} props.error - Error if any
 * @param {Function} props.onSubmit - Form submission handler
 *
 * @returns The forgot password form
 */
export const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({
    form,
    loading,
    error,
    onSubmit
}) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="admin_forgot_password"
            className={styles.forgotPasswordForm}
        >
            <FormHeader
                title="Mot de passe oublié"
                subtitle={`Entrer l'adresse e-mail associée à votre compte.
                        Nous vous enverrons un code de vérification pour réinitialiser le mot de passe.`}
            />

            <Item
                name="email"
                label="Adresse e-mail"
                validateTrigger={["onSubmit", "onBlur"]}
                rules={ForgotPasswordValidator.email("Adresse e-mail")}
            >
                <Input prefix={<IconMailOutlined />} placeholder="Adresse e-mail" />
            </Item>

            <ErrorAlert error={error} showIcon closable banner={false} />

            <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.forgotPasswordForm__submitButton}
            >
                Envoyer le code
            </Button>

            <Item className={styles.forgotPasswordForm__backToLogin}>
                <BackToLoginButton />
            </Item>
        </Form>
    );
};
