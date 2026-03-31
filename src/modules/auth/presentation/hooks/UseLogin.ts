import { Form, type FormInstance } from "antd";
import { useNavigate } from "react-router";
import type { ILoginCredentials } from "@/modules/auth/presentation/model/ILoginCredentials";
import { loginAction, resetLoginAction } from "@/modules/auth/presentation/store/login.action";
import { setCurrentUserAction } from "@/platform/session/presentation/store/currentuser.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { OVERVIEW_PATH } from "@/shared/infrastructure/constants/paths";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

const { useForm } = Form;

interface IUseLogin {
    loading: boolean;
    resetLogin: () => void;
    form: FormInstance<ILoginCredentials>;
    error: Failure | null | undefined;
    onSubmit: (formValues: ILoginCredentials) => Promise<void>;
}

/**
 * Custom hook for login form logic.
 *
 * @description
 * Manages login form state, submission, and navigation.
 * Handles form validation, API calls, and redirects on successful login.
 *
 * @returns Login form utilities and state
 * @returns {FormInstance} form - Ant Design form instance
 * @returns {Failure | null} error - Login error if any
 * @returns {boolean} loading - Whether login is in progress
 * @returns {Function} onSubmit - Form submission handler
 * @returns {Function} resetLogin - Function to reset login state
 */
export const useLogin = (): IUseLogin => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form] = useForm<ILoginCredentials>();

    const { error, loading } = useAppSelector(({ auth: { login } }) => login);

    /**
     * Handles login form submission.
     *
     * @param {ILoginCredentials} formValues - Email and password from form
     *
     * @description
     * Dispatches login action and handles the result:
     * - On rejection: Resets form fields
     * - On success: Navigates to dashboard
     */
    const onSubmit = async (formValues: ILoginCredentials): Promise<void> => {
        const result = await dispatch(loginAction(formValues));
        if (loginAction.rejected.match(result)) form.resetFields();

        if (loginAction.fulfilled.match(result)) {
            dispatch(setCurrentUserAction(result.payload.user));
            navigate(OVERVIEW_PATH, { replace: true });
        }
    };

    /**
     * Resets login state (error and loading flags).
     *
     * @description
     * Dispatches reset action to clear any previous login errors.
     * Typically called on component mount.
     */
    const resetLogin = () => {
        dispatch(resetLoginAction());
    };

    return {
        form,
        error,
        loading,
        onSubmit,
        resetLogin
    };
};
