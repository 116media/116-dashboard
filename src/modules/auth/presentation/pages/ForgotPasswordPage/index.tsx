import { Card } from "antd";
import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import type { IRootState } from "@/core/presentation/store/root.reducer";
import { ForgotPasswordContainer } from "@/modules/auth/presentation/containers/ForgotPasswordContainer";
import { ResetPasswordContainer } from "@/modules/auth/presentation/containers/ResetPasswordContainer";
import { VerifyOtpContainer } from "@/modules/auth/presentation/containers/VerifyOtpContainer";
import { Logo } from "@/shared/ui/Logo";

import styles from "./index.module.scss";

type ForgotPasswordStep = "resetPassword" | "verifyOtp" | "forgotPassword";

/**
 * Forgot password page component for password reset flow.
 *
 * @component
 *
 * @description
 * Main forgot password page displaying the application logo and multi-step password reset flow
 * in a centered card layout.
 *
 * Implements a three-step flow:
 * 1. ForgotPasswordContainer - User enters email address
 * 2. VerifyOtpContainer - User enters 6-digit OTP code
 * 3. ResetPasswordContainer - User sets new password
 *
 * @returns The forgot password page
 */
const ForgotPasswordPage: FC = () => {
    const { fetched: forgotPasswordFetched, data: forgotPasswordData } = useSelector(
        ({ auth: { forgotPassword } }: IRootState) => forgotPassword
    );

    const { fetched: verifyOtpFetched, data: verifyOtpData } = useSelector(
        ({ auth: { verifyOtp } }: IRootState) => verifyOtp
    );

    const isVerifyOtpSuccess = Boolean(verifyOtpFetched && verifyOtpData?.isSuccess);
    const isForgotPasswordSuccess = Boolean(forgotPasswordFetched && forgotPasswordData?.isSuccess);

    const email = forgotPasswordData?.email || "";

    /**
     * Step configuration object
     */
    const steps: Record<ForgotPasswordStep, ReactNode> = {
        resetPassword: <ResetPasswordContainer email={email} />,
        verifyOtp: <VerifyOtpContainer email={email} />,
        forgotPassword: <ForgotPasswordContainer />
    };

    /**
     * Resolve which step to render based on current state.
     */
    const renderCurrentStep = (): ReactNode => {
        if (isVerifyOtpSuccess) return steps.resetPassword;
        if (isForgotPasswordSuccess) return steps.verifyOtp;

        return steps.forgotPassword;
    };

    return (
        <div className={styles.forgotPassword}>
            <Card hoverable={false} variant="borderless" className={styles.forgotPassword__card}>
                <Logo canRedirect={false} className={styles.forgotPassword__card__logo} />
                {renderCurrentStep()}
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
