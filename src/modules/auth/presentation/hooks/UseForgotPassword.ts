import type { FormInstance } from "antd";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "@/core/presentation/store/store";
import type { IForgotPasswordCredentials } from "@/modules/auth/presentation/model/IForgotPasswordCredentials";
import {
    forgotPasswordAction,
    resetForgotPasswordAction
} from "@/modules/auth/presentation/store/forgotpassword.action";
import type { IApiProblemDetails } from "@/shared/api/type";

const { useForm } = Form;

interface IUseForgotPassword {
    loading: boolean;
    email: string;
    isSuccess: boolean;
    resetForgotPassword: () => void;
    error: IApiProblemDetails | null | undefined;
    form: FormInstance<IForgotPasswordCredentials>;
    onSubmit: (formValues: IForgotPasswordCredentials) => Promise<void>;
}

/**
 * Custom hook for forgot password form logic.
 *
 * @description
 * Manages forgot password form state, submission, and feedback.
 * Handles form validation and API calls.
 *
 * @returns Forgot password form utilities and state
 * @returns {FormInstance} form - Ant Design form instance
 * @returns {IApiProblemDetails | null} error - Forgot password error if any
 * @returns {boolean} loading - Whether forgot password request is in progress
 * @returns {boolean} isSuccess - Whether forgot password request succeeded
 * @returns {string} email - Email address from the request for client reference
 * @returns {Function} onSubmit - Form submission handler
 * @returns {Function} resetForgotPassword - Function to reset forgot password state
 */
export const useForgotPassword = (): IUseForgotPassword => {
    const dispatch = useAppDispatch();

    const [form] = useForm<IForgotPasswordCredentials>();

    const { error, loading, fetched, data } = useAppSelector(
        ({ auth: { forgotPassword } }) => forgotPassword
    );

    const isSuccess = Boolean(fetched && data.isSuccess);

    /**
     * Handles forgot password form submission.
     *
     * @param {IForgotPasswordCredentials} formValues - Email from form
     *
     * @description
     * Dispatches forgot password action and handles the result:
     * - On rejection: Resets form fields
     * - On success: Shows success state (form component handles messaging)
     */
    const onSubmit = async (formValues: IForgotPasswordCredentials): Promise<void> => {
        const result = await dispatch(forgotPasswordAction(formValues));
        if (forgotPasswordAction.rejected.match(result)) {
            form.resetFields();
        }
    };

    /**
     * Resets forgot password state (error and loading flags).
     *
     * @description
     * Dispatches reset action to clear any previous errors or success state.
     * Typically called on component mount.
     */
    const resetForgotPassword = () => {
        dispatch(resetForgotPasswordAction());
    };

    return {
        form,
        error,
        loading,
        onSubmit,
        isSuccess,
        email: data?.email,
        resetForgotPassword
    };
};
