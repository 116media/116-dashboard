import { Spin } from "antd";
import { type FC, useEffect } from "react";
import { useParams } from "react-router";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import OrderItemForm from "@/modules/commerce/presentation/components/forms/OrderItemForm";
import OrderTierForm from "@/modules/commerce/presentation/components/forms/OrderTierForm";
import PaymentProofForm from "@/modules/commerce/presentation/components/forms/PaymentProofForm";
import OrderDetailView from "@/modules/commerce/presentation/components/ui/OrderDetailView";
import { useAddItemTier } from "@/modules/commerce/presentation/hooks/UseAddItemTier";
import { useAddOrderItem } from "@/modules/commerce/presentation/hooks/UseAddOrderItem";
import { useAttachPaymentProof } from "@/modules/commerce/presentation/hooks/UseAttachPaymentProof";
import { useOrderActions } from "@/modules/commerce/presentation/hooks/UseOrderActions";
import { useOrderDetail } from "@/modules/commerce/presentation/hooks/UseOrderDetail";
import { useOrderDetailModals } from "@/modules/commerce/presentation/hooks/UseOrderDetailModals";
import { usePaymentActions } from "@/modules/commerce/presentation/hooks/UsePaymentActions";
import { getPricingTiersAction } from "@/modules/lookup/presentation/store/getpricingtiers.action";
import { getPromotionLevelsAction } from "@/modules/lookup/presentation/store/getpromotionlevels.action";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

/**
 * Container for the order detail view.
 *
 * @component
 *
 * @description
 * Orchestrates the order detail page by composing `useOrderDetail`,
 * `useOrderActions`, `usePaymentActions`, and form hooks with the
 * detail view, add-item modal, add-tier modal, and payment proof
 * modal. Preloads categories, promotion levels, and pricing tiers
 * on mount for form Select dropdowns.
 */
const OrderDetailContainer: FC = () => {
    const { id: orderId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const detail = useOrderDetail(orderId ?? "");
    const modals = useOrderDetailModals();
    const orderActions = useOrderActions(detail.reload);
    const paymentActions = usePaymentActions(detail.reload);
    const addItem = useAddOrderItem(orderId ?? null, () => {
        modals.setAddItemOpen(false);
        detail.reload();
    });
    const addTier = useAddItemTier(orderId ?? null, modals.selectedItemId, () => {
        modals.setAddTierOpen(false);
        detail.reload();
    });
    const attachProof = useAttachPaymentProof(orderId ?? null, () => {
        modals.setProofOpen(false);
        detail.reload();
    });

    useEffect(() => {
        dispatch(getAllCategoriesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getPromotionLevelsAction());
        dispatch(getPricingTiersAction());
    }, [dispatch]);

    if (detail.loadingOrder && !detail.order) {
        return <Spin size="large" style={{ display: "block", margin: "64px auto" }} />;
    }

    if (detail.error && !detail.order) {
        return <ErrorAlert error={detail.error} showIcon closable banner />;
    }

    const { order } = detail;
    if (!order) return null;

    return (
        <>
            <OrderDetailView
                order={order}
                payment={detail.payment}
                loadingPayment={detail.loadingPayment}
                actionsLoading={orderActions.loading}
                onSubmitOrder={() => orderActions.onSubmit(order.id)}
                onCancelOrder={() => orderActions.onCancel(order.id)}
                onAddItem={() => modals.setAddItemOpen(true)}
                onAttachProof={() => modals.setProofOpen(true)}
                onVerifyPayment={() => {
                    if (detail.payment?.paymentProof) {
                        paymentActions.onVerify(order.id, detail.payment.paymentProof.storageUrl);
                    }
                }}
                onRejectPayment={() => paymentActions.onReject(order.id)}
            />

            {modals.addItemOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.addItemOpen}
                    formContext="CREATE"
                    loading={addItem.loading}
                    success={addItem.success}
                    onClose={() => modals.setAddItemOpen(false)}
                    onSubmit={() => addItem.form.submit()}
                    title={{
                        create: "Ajouter un article",
                        edit: "Ajouter un article"
                    }}
                    onSuccessClose={() => {
                        modals.setAddItemOpen(false);
                        addItem.resetAddItem();
                        detail.reload();
                    }}
                >
                    <OrderItemForm
                        form={addItem.form}
                        error={addItem.error}
                        onSubmit={addItem.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.addTierOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.addTierOpen}
                    formContext="CREATE"
                    loading={addTier.loading}
                    success={addTier.success}
                    onClose={() => modals.setAddTierOpen(false)}
                    onSubmit={() => addTier.form.submit()}
                    title={{
                        create: "Ajouter une tranche",
                        edit: "Ajouter une tranche"
                    }}
                    onSuccessClose={() => {
                        modals.setAddTierOpen(false);
                        addTier.resetAddTier();
                        detail.reload();
                    }}
                >
                    <OrderTierForm
                        form={addTier.form}
                        error={addTier.error}
                        onSubmit={addTier.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.proofOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.proofOpen}
                    formContext="CREATE"
                    loading={attachProof.loading}
                    success={attachProof.success}
                    onClose={() => modals.setProofOpen(false)}
                    onSubmit={() => attachProof.form.submit()}
                    title={{
                        create: "Attacher une preuve de paiement",
                        edit: "Attacher une preuve de paiement"
                    }}
                    onSuccessClose={() => {
                        modals.setProofOpen(false);
                        attachProof.resetAttachProof();
                        detail.reload();
                    }}
                >
                    <PaymentProofForm
                        form={attachProof.form}
                        error={attachProof.error}
                        onSubmit={attachProof.onSubmit}
                    />
                </CreateEditModal>
            )}
        </>
    );
};

export default OrderDetailContainer;
