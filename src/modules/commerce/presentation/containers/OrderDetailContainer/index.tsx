import { type FC, useEffect } from "react";
import { useParams } from "react-router";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import OrderForm from "@/modules/commerce/presentation/components/forms/OrderForm";
import OrderItemForm from "@/modules/commerce/presentation/components/forms/OrderItemForm";
import OrderTierForm from "@/modules/commerce/presentation/components/forms/OrderTierForm";
import PaymentProofForm from "@/modules/commerce/presentation/components/forms/PaymentProofForm";
import OrderDetailView from "@/modules/commerce/presentation/components/ui/OrderDetailView";
import { useAddItemTier } from "@/modules/commerce/presentation/hooks/UseAddItemTier";
import { useAddOrderItem } from "@/modules/commerce/presentation/hooks/UseAddOrderItem";
import { useAttachPaymentProof } from "@/modules/commerce/presentation/hooks/UseAttachPaymentProof";
import { useEditOrder } from "@/modules/commerce/presentation/hooks/UseEditOrder";
import { useEditOrderItem } from "@/modules/commerce/presentation/hooks/UseEditOrderItem";
import { useOrderActions } from "@/modules/commerce/presentation/hooks/UseOrderActions";
import { useOrderDetail } from "@/modules/commerce/presentation/hooks/UseOrderDetail";
import { useOrderDetailModals } from "@/modules/commerce/presentation/hooks/UseOrderDetailModals";
import { usePaymentActions } from "@/modules/commerce/presentation/hooks/UsePaymentActions";
import { removeItemAction } from "@/modules/commerce/presentation/store/removeitem.action";
import { removeItemTierAction } from "@/modules/commerce/presentation/store/removeitemtier.action";
import { OrdersNotification } from "@/modules/commerce/presentation/utils/notification/commerce.orders.notification";
import { getPricingTiersAction } from "@/modules/lookup/presentation/store/getpricingtiers.action";
import { getPromotionLevelsAction } from "@/modules/lookup/presentation/store/getpromotionlevels.action";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import OrderDetailLoading from "./OrderDetailContainer.Loading";

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
    const addItem = useAddOrderItem(orderId ?? null, detail.reload);
    const addTier = useAddItemTier(orderId ?? null, modals.selectedItemId, detail.reload);
    const attachProof = useAttachPaymentProof(orderId ?? null, detail.reload);
    const editOrder = useEditOrder(
        orderId ?? null,
        (detail.order as IOrderDetailEntity) ?? null,
        detail.reload
    );
    const editItem = useEditOrderItem(
        orderId ?? null,
        modals.selectedItemId,
        modals.selectedItem,
        detail.reload
    );

    useEffect(() => {
        dispatch(getAllCategoriesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getPromotionLevelsAction());
        dispatch(getPricingTiersAction());
    }, [dispatch]);

    if (detail.loadingOrder && !detail.order) {
        return <OrderDetailLoading />;
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
                onAddTier={(itemId, categoryName) => modals.openAddTier(itemId, categoryName)}
                onRemoveItem={async (itemId) => {
                    if (!orderId) return;
                    const result = await dispatch(removeItemAction({ orderId, itemId }));
                    if (removeItemAction.fulfilled.match(result)) {
                        showNotification(OrdersNotification.removeItemSuccess);
                        detail.reload();
                    }
                }}
                onRemoveTier={async (itemId, tierId) => {
                    if (!orderId) return;
                    const result = await dispatch(
                        removeItemTierAction({ orderId, itemId, tierId })
                    );
                    if (removeItemTierAction.fulfilled.match(result)) {
                        showNotification(OrdersNotification.removeTierSuccess);
                        detail.reload();
                    }
                }}
                onEditItem={(item) => modals.openEditItem(item)}
                onEditOrder={() => modals.setEditOrderOpen(true)}
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
                    formContext="CREATE"
                    open={modals.addItemOpen}
                    loading={addItem.loading}
                    success={addItem.success}
                    onSubmit={() => addItem.form.submit()}
                    onClose={() => modals.setAddItemOpen(false)}
                    afterClose={() => addItem.resetAddItem()}
                    title={{
                        create: "Ajouter un produit",
                        edit: "Ajouter un produit"
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
                        isBonusDefault={!!order.packageId}
                        onSubmit={addItem.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.addTierOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.addTierOpen}
                    loading={addTier.loading}
                    success={addTier.success}
                    onSubmit={() => addTier.form.submit()}
                    onClose={() => modals.setAddTierOpen(false)}
                    afterClose={() => addTier.resetAddTier()}
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
                        categoryName={modals.selectedItemCategoryName}
                        onSubmit={addTier.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.proofOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.proofOpen}
                    loading={attachProof.loading}
                    success={attachProof.success}
                    onClose={() => modals.setProofOpen(false)}
                    onSubmit={() => attachProof.form.submit()}
                    afterClose={() => attachProof.resetAttachProof()}
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

            {modals.editOrderOpen && (
                <CreateEditModal
                    width={480}
                    formContext="EDIT"
                    open={modals.editOrderOpen}
                    loading={editOrder.loading}
                    success={editOrder.success}
                    onSubmit={() => editOrder.form.submit()}
                    onClose={() => modals.setEditOrderOpen(false)}
                    afterClose={() => editOrder.resetEdit()}
                    title={{
                        create: "Modifier la commande",
                        edit: "Modifier la commande"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOrderOpen(false);
                        editOrder.resetEdit();
                        detail.reload();
                    }}
                >
                    <OrderForm
                        form={editOrder.form}
                        error={editOrder.error}
                        onSubmit={editOrder.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editItemOpen && (
                <CreateEditModal
                    width={480}
                    formContext="EDIT"
                    open={modals.editItemOpen}
                    loading={editItem.loading}
                    success={editItem.success}
                    onSubmit={() => editItem.form.submit()}
                    onClose={() => modals.setEditItemOpen(false)}
                    afterClose={() => editItem.resetEdit()}
                    title={{
                        create: "Modifier le produit",
                        edit: "Modifier le produit"
                    }}
                    onSuccessClose={() => {
                        modals.setEditItemOpen(false);
                        editItem.resetEdit();
                        detail.reload();
                    }}
                >
                    <OrderItemForm
                        form={editItem.form}
                        error={editItem.error}
                        onSubmit={editItem.onSubmit}
                    />
                </CreateEditModal>
            )}
        </>
    );
};

export default OrderDetailContainer;
