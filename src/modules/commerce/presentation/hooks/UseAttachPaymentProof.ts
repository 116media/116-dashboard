import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAttachPaymentProofCredentials } from "@/modules/commerce/presentation/model/IAttachPaymentProofCredentials";
import { usePaymentActions } from "@/modules/commerce/presentation/hooks/UsePaymentActions";
import type { Failure } from "@/shared/domain/failures/failure";

const { useForm } = Form;

/**
 * Return type for the attach payment proof hook.
 *
 * @interface IUseAttachPaymentProof
 */
interface IUseAttachPaymentProof {
    form: FormInstance<IAttachPaymentProofCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IAttachPaymentProofCredentials) => Promise<void>;
    resetAttachProof: () => void;
}

/**
 * Custom hook for the attach payment proof form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * uploading a payment proof file. Extracts the native File
 * from Ant Design's UploadFile and delegates to `usePaymentActions`.
 *
 * @param orderId - The order UUID to attach the proof to
 * @param onSuccess - Optional callback after successful attachment
 * @returns {IUseAttachPaymentProof} Form instance, loading/error state, success message, submit handler, and reset function
 */
export const useAttachPaymentProof = (
    orderId: string | null,
    onSuccess?: () => void
): IUseAttachPaymentProof => {
    const [form] = useForm<IAttachPaymentProofCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const paymentActions = usePaymentActions(() => {
        setSuccess("La preuve de paiement a été attachée avec succès.");
        form.resetFields();
        onSuccess?.();
    });

    const onSubmit = async (values: IAttachPaymentProofCredentials): Promise<void> => {
        if (!orderId) return;

        const file = values.file?.[0]?.originFileObj;
        if (!file) return;

        await paymentActions.onAttachProof(orderId, file, values.paymentMethod);
    };

    const resetAttachProof = () => {
        setSuccess(null);
    };

    return {
        form,
        loading: paymentActions.loading,
        error: paymentActions.error,
        success,
        onSubmit,
        resetAttachProof
    };
};
