import { attachPaymentProofAction } from "@/modules/commerce/presentation/store/attachpaymentproof.action";
import { rejectPaymentAction } from "@/modules/commerce/presentation/store/rejectpayment.action";
import { verifyPaymentAction } from "@/modules/commerce/presentation/store/verifypayment.action";
import { PaymentNotification } from "@/modules/commerce/presentation/utils/notification/commerce.payment.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import type { EnumPaymentMethod } from "@/shared/infrastructure/api/generated/116.api";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the payment actions hook.
 *
 * @interface IUsePaymentActions
 */
interface IUsePaymentActions {
    loading: boolean;
    error: Failure | null | undefined;
    onAttachProof: (orderId: string, file: File, paymentMethod: EnumPaymentMethod) => Promise<void>;
    onVerify: (orderId: string, receiptUrl: string) => Promise<void>;
    onReject: (orderId: string, notes?: string) => Promise<void>;
}

/**
 * Custom hook for payment proof, verify, and reject actions.
 *
 * @param reload - Callback to refresh the order detail after a successful action
 * @returns {IUsePaymentActions} Loading/error state and attach-proof/verify/reject handlers
 */
export const usePaymentActions = (reload: () => void): IUsePaymentActions => {
    const dispatch = useAppDispatch();

    const attachState = useAppSelector(
        ({ commerce: { attachPaymentProof } }) => attachPaymentProof
    );
    const verifyState = useAppSelector(({ commerce: { verifyPayment } }) => verifyPayment);
    const rejectState = useAppSelector(({ commerce: { rejectPayment } }) => rejectPayment);

    const loading = attachState.loading || verifyState.loading || rejectState.loading;
    const error = attachState.error || verifyState.error || rejectState.error;

    const onAttachProof = async (
        orderId: string,
        file: File,
        paymentMethod: EnumPaymentMethod
    ): Promise<void> => {
        const result = await dispatch(attachPaymentProofAction({ orderId, file, paymentMethod }));

        if (attachPaymentProofAction.fulfilled.match(result)) {
            showNotification(PaymentNotification.attachProofSuccess);
            reload();
        } else if (attachPaymentProofAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onVerify = async (orderId: string, receiptUrl: string): Promise<void> => {
        const result = await dispatch(verifyPaymentAction({ orderId, receiptUrl }));

        if (verifyPaymentAction.fulfilled.match(result)) {
            showNotification(PaymentNotification.verifySuccess);
            reload();
        } else if (verifyPaymentAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onReject = async (orderId: string, notes?: string): Promise<void> => {
        const result = await dispatch(rejectPaymentAction({ orderId, notes }));

        if (rejectPaymentAction.fulfilled.match(result)) {
            showNotification(PaymentNotification.rejectSuccess);
            reload();
        } else if (rejectPaymentAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    return { loading, error, onAttachProof, onVerify, onReject };
};
