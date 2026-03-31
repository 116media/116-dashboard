import type { FormInstance } from "antd";
import { Form } from "antd";
import type { IResetPasswordCredentials } from "@/modules/auth/presentation/model/IResetPasswordCredentials";
import {
    resetPasswordAction,
    resetResetPasswordAction
} from "@/modules/auth/presentation/store/resetpassword.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

const { useForm } = Form;

interface IFormValues {
    newPassword: string;
    confPassword: string;
}

interface IUseResetPassword {
    loading: boolean;
    isSuccess: boolean;
    resetResetPassword: () => void;
    form: FormInstance<IFormValues>;
    error: Failure | null | undefined;
    onSubmit: (formValues: IFormValues) => Promise<void>;
}

/**
 * Custom hook for reset password form logic.
 *
 * @description
 * Manages reset password form state, submission, and feedback.
 * Handles form validation and API calls.
 *
 * @param {string} email - User email for password reset
 *
 * @returns Reset password form utilities and state
 * @returns {FormInstance} form - Ant Design form instance
 * @returns {Failure | null} error - Reset password error if any
 * @returns {boolean} loading - Whether reset password request is in progress
 * @returns {boolean} isSuccess - Whether reset password request succeeded
 * @returns {Function} onSubmit - Form submission handler
 * @returns {Function} resetResetPassword - Function to reset reset password state
 */
export const useResetPassword = (email: string): IUseResetPassword => {
    const dispatch = useAppDispatch();

    const [form] = useForm<IFormValues>();

    const { error, loading, fetched, data } = useAppSelector(
        ({ auth: { resetPassword } }) => resetPassword
    );

    const isSuccess = Boolean(fetched && data.isSuccess);

    /**
     * Handles reset password form submission.
     *
     * @param {IFormValues} formValues - New password and confirmation from form
     *
     * @description
     * Dispatches reset password action and handles the result:
     * - On rejection: Resets form fields
     * - On success: Shows success state (form component handles notification and redirect)
     */
    const onSubmit = async (formValues: IFormValues): Promise<void> => {
        const credentials: IResetPasswordCredentials = {
            email,
            code: "",
            newPassword: formValues.newPassword
        };

        const result = await dispatch(resetPasswordAction(credentials));

        if (resetPasswordAction.rejected.match(result)) {
            form.resetFields();
        }
    };

    /**
     * Resets reset password state (error and loading flags).
     *
     * @description
     * Dispatches reset action to clear any previous errors or success state.
     * Typically called on component mount.
     */
    const resetResetPassword = () => {
        dispatch(resetResetPasswordAction());
    };

    return {
        form,
        error,
        loading,
        onSubmit,
        isSuccess,
        resetResetPassword
    };
};
