import { type FC, useEffect } from "react";
import { EOtpPurpose } from "@/modules/auth/domain/enums/EOtpPurpose";
import { VerifyOtpForgotPasswordForm } from "@/modules/auth/presentation/components/forms/VerifyOtpForgotPasswordForm";
import { useResendOtp } from "@/modules/auth/presentation/hooks/UseResendOtp";
import { useVerifyOtp } from "@/modules/auth/presentation/hooks/UseVerifyOtp";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";

interface IVerifyOtpContainerProps {
    email: string;
}

/**
 * Container component for the verify OTP form.
 *
 * @component
 *
 * @description
 * Wires the verify OTP and resend OTP hooks to the presentational VerifyOtpForgotPasswordForm.
 * Manages side effects: resets verify OTP state on mount, handles OTP submission enrichment.
 *
 * @param {IVerifyOtpContainerProps} props - Container props
 * @param {string} props.email - User's email address for OTP verification
 *
 * @returns The verify OTP form container
 */
export const VerifyOtpContainer: FC<IVerifyOtpContainerProps> = ({ email }) => {
    const { form, onSubmit, loading, error, resetVerifyOtp } = useVerifyOtp(
        email,
        EOtpPurpose.PasswordReset
    );

    const { countdown, isResendDisabled, handleResendOtp } = useResendOtp(
        email,
        EOtpPurpose.PasswordReset
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: only want to run on mount
    useEffect(() => {
        resetVerifyOtp();
    }, []);

    const handleSubmit = async (formValues: IVerifyOtpCredentials) => {
        await onSubmit({
            email,
            otp: formValues.otp,
            purpose: EOtpPurpose.PasswordReset
        });
    };

    return (
        <VerifyOtpForgotPasswordForm
            email={email}
            form={form}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            countdown={countdown}
            isResendDisabled={isResendDisabled}
            onResend={handleResendOtp}
        />
    );
};
