import { useEffect, useState } from "react";
import type { EOtpPurpose } from "@/modules/auth/domain/enums/EOtpPurpose";
import { resendOtpAction } from "@/modules/auth/presentation/store/resendotp.action";
import { AuthNotification } from "@/modules/auth/presentation/utils/notification/auth.notification";
import { useAppDispatch } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

interface IUseResendOtp {
    countdown: number;
    isResendDisabled: boolean;
    handleResendOtp: () => Promise<void>;
}

const COUNTDOWN_SECONDS = 60;

/**
 * Custom hook for resending OTP with countdown timer.
 *
 * @description
 * Manages OTP resend functionality with a countdown timer.
 * Disables resend button during countdown and shows success notification on successful resend.
 *
 * @param {string} email - User's email address
 * @param {EOtpPurpose} purpose - OTP purpose (e.g., PasswordReset)
 *
 * @returns Resend OTP utilities and state
 * @returns {number} countdown - Current countdown value in seconds
 * @returns {boolean} isResendDisabled - Whether resend button should be disabled
 * @returns {Function} handleResendOtp - Function to trigger OTP resend
 */
export const useResendOtp = (email: string, purpose: EOtpPurpose): IUseResendOtp => {
    const dispatch = useAppDispatch();
    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    // Countdown timer effect
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        setIsResendDisabled(false);
    }, [countdown]);

    /**
     * Handles resending OTP code.
     *
     * @description
     * Dispatches resend OTP action and shows success notification.
     * Resets countdown timer on successful resend.
     */
    const handleResendOtp = async (): Promise<void> => {
        if (!email) return;

        const result = await dispatch(
            resendOtpAction({
                email,
                purpose
            })
        );

        if (resendOtpAction.fulfilled.match(result)) {
            showNotification(AuthNotification.otpSentSuccess);

            // Reset countdown
            setCountdown(COUNTDOWN_SECONDS);
            setIsResendDisabled(true);
        } else if (resendOtpAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return {
        countdown,
        isResendDisabled,
        handleResendOtp
    };
};
