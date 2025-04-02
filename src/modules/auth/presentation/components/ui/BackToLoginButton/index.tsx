import { Button } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { authSlice } from "@/modules/auth/presentation/store";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
import { useAppDispatch } from "@/shared/presentation/store/store";
import { IconArrowLeftOutlined } from "@/shared/presentation/ui/Icons";

/**
 * Back to login button component.
 *
 * @component
 *
 * @description
 * Renders a button that navigates back to the login page.
 *
 * Automatically purges forgot password flow states (forgotPassword, verifyOtp, resendOtp, resetPassword)
 * when clicked, then navigates to login page only after successful purge.
 *
 * @returns The back to login button
 */
export const BackToLoginButton: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(
            authSlice.actions.purge(["forgotPassword", "verifyOtp", "resendOtp", "resetPassword"])
        );

        navigate(LOGIN_PATH);
    };

    return (
        <Button
            block
            size="middle"
            variant="text"
            color="default"
            onClick={handleClick}
            icon={<IconArrowLeftOutlined />}
        >
            Retour à la connexion
        </Button>
    );
};
