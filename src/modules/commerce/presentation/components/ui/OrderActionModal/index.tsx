import type { FC } from "react";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import { ORDER_ACTION_CONFIG } from "@/modules/commerce/presentation/constants/commerce.orders.config";
import type { OrderAction } from "@/modules/commerce/presentation/constants/commerce.orders.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the OrderActionModal component.
 *
 * @interface IOrderActionModalProps
 *
 * @property {boolean} open - Whether the modal is visible
 * @property {boolean} loading - Loading state for the confirm button
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} onConfirm - Confirm handler
 * @property {IOrderSummaryEntity | null} order - The order being acted upon
 * @property {OrderAction | null} action - The action type (submit, cancel)
 * @property {Failure | null | undefined} error - Backend error to display
 */
interface IOrderActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    order: IOrderSummaryEntity | null;
    action: OrderAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for order submit and cancel actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps order action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IOrderActionModalProps} props - Component props
 * @returns {JSX.Element | null} The order action modal, or null if no config/order
 */
const OrderActionModal: FC<IOrderActionModalProps> = ({
    open,
    order,
    action,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? ORDER_ACTION_CONFIG[action] : undefined;

    if (!config || !order) return null;

    return (
        <ActionModal
            open={open}
            error={error}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            danger={config.danger}
            description={config.description}
        />
    );
};

export default OrderActionModal;
