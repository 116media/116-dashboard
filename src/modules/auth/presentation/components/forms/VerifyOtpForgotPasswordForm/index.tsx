import type { FormInstance } from "antd";
import { Button, Form, Input, Typography } from "antd";
import type { FC } from "react";
import { BackToLoginButton } from "@/modules/auth/presentation/components/ui/BackToLoginButton";
import FormHeader from "@/modules/auth/presentation/components/ui/FormHeader";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import { ForgotPasswordValidator } from "@/modules/auth/presentation/utils/validators/forgotpassword.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

import styles from "./index.module.scss";

const { Item } = Form;
const { Text } = Typography;

export interface IVerifyOtpForgotPasswordFormProps {
    email: string;
    form: FormInstance<IVerifyOtpCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (values: IVerifyOtpCredentials) => void;
    countdown: number;
    isResendDisabled: boolean;
    onResend: () => void;
}

/**
 * Presentational verify OTP form component for password reset flow.
 *
 * @component
 *
 * @description
 * Renders the OTP verification form with 6-digit input, resend button with countdown,
 * and error display. All state and logic are provided via props from a container.
 *
 * @param {IVerifyOtpForgotPasswordFormProps} props - Component props
 * @param {string} props.email - User's email address to display
 * @param {FormInstance} props.form - Ant Design form instance
 * @param {boolean} props.loading - Whether verification is in progress
 * @param {Failure | null} props.error - Error if any
 * @param {Function} props.onSubmit - Form submission handler
 * @param {number} props.countdown - Countdown seconds remaining for resend
 * @param {boolean} props.isResendDisabled - Whether resend button is disabled
 * @param {Function} props.onResend - Resend OTP handler
 *
 * @returns The verify OTP form
 */
export const VerifyOtpForgotPasswordForm: FC<IVerifyOtpForgotPasswordFormProps> = ({
    email,
    form,
    loading,
    error,
    onSubmit,
    countdown,
    isResendDisabled,
    onResend
}) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="admin_verify_otp"
            className={styles.verifyOtpForm}
        >
            <FormHeader
                title="Tapez le code de vérification"
                subtitle={
                    <>
                        Le code de vérification vient d'être envoyé à votre e-mail: <b>{email}</b>.
                    </>
                }
            />

            <Item
                name="otp"
                className={styles.verifyOtpForm__input}
                rules={ForgotPasswordValidator.otp("Code")}
            >
                <Input.OTP length={6} formatter={(str) => str.replace(/\D/g, "")} />
            </Item>

            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item className={styles.verifyOtpForm__resendCodeButton}>
                <Button
                    block
                    type="link"
                    size="small"
                    onClick={onResend}
                    disabled={isResendDisabled}
                >
                    <Text type="secondary">Code non reçu?</Text> Renvoyer{" "}
                    {isResendDisabled ? `dans ${countdown} secondes` : ""}
                </Button>
            </Item>

            <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.verifyOtpForm__submitButton}
            >
                Vérifier
            </Button>

            <Item className={styles.verifyOtpForm__backToLogin}>
                <BackToLoginButton />
            </Item>
        </Form>
    );
};
