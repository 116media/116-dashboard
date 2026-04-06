import type { FormInstance } from "antd";
import { Form } from "antd";
import type { EOtpPurpose } from "@/modules/auth/domain/enums/EOtpPurpose";
import type { IVerifyOtpCredentials } from "@/modules/auth/presentation/model/IVerifyOtpCredentials";
import {
    resetVerifyOtpAction,
    verifyOtpAction
} from "@/modules/auth/presentation/store/verifyotp.action";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";

const { useForm } = Form;

interface IUseVerifyOtp {
    loading: boolean;
    isSuccess: boolean;
    resetVerifyOtp: () => void;
    form: FormInstance<IVerifyOtpCredentials>;
    error: IApiProblemDetails | null | undefined;
    onSubmit: (formValues: IVerifyOtpCredentials) => Promise<void>;
}

/**
 * Custom hook for verify OTP form logic.
 *
 * @description
 * Manages verify OTP form state, submission, and feedback.
 * Handles form validation and API calls.
 *
 * @param {string} email - User email for OTP verification
 *
 * @returns Verify OTP form utilities and state
 * @returns {FormInstance} form - Ant Design form instance
 * @returns {IApiProblemDetails | null} error - Verify OTP error if any
 * @returns {boolean} loading - Whether verify OTP request is in progress
 * @returns {boolean} isSuccess - Whether verify OTP request succeeded
 * @returns {Function} onSubmit - Form submission handler
 * @returns {Function} resetVerifyOtp - Function to reset verify OTP state
 */
export const useVerifyOtp = (email: string, purpose: EOtpPurpose): IUseVerifyOtp => {
    const dispatch = useAppDispatch();

    const [form] = useForm<IVerifyOtpCredentials>();

    const { error, loading, fetched, data } = useAppSelector(
        ({ auth: { verifyOtp } }) => verifyOtp
    );

    const isSuccess = Boolean(fetched && data.isSuccess);

    /**
     * Handles verify OTP form submission.
     *
     * @param {IVerifyOtpCredentials} formValues - OTP and purpose from form
     *
     * @description
     * Dispatches verify OTP action and handles the result:
     * - On rejection: Resets form fields
     * - On success: Shows success state (form component handles messaging)
     */
    const onSubmit = async (formValues: IVerifyOtpCredentials): Promise<void> => {
        const result = await dispatch(
            verifyOtpAction({
                ...formValues,
                email,
                purpose
            })
        );

        if (verifyOtpAction.rejected.match(result)) {
            form.resetFields();
        }
    };

    /**
     * Resets verify OTP state (error and loading flags).
     *
     * @description
     * Dispatches reset action to clear any previous errors or success state.
     * Typically called on component mount.
     */
    const resetVerifyOtp = () => {
        dispatch(resetVerifyOtpAction());
    };

    return {
        form,
        error,
        loading,
        onSubmit,
        isSuccess,
        resetVerifyOtp
    };
};
