import type { FC } from "react";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import { PRICING_TIER_ACTION_CONFIG } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.config";
import type { PricingTierAction } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the PricingTierActionModal component.
 *
 * @interface IPricingTierActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IPricingTierEntity | null} pricingTier - The pricing tier being acted upon
 * @property {PricingTierAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IPricingTierActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onAfterClose?: () => void;
    pricingTier: IPricingTierEntity | null;
    action: PricingTierAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for pricing tier activate and deactivate actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps pricing tier action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IPricingTierActionModalProps} props - Component props
 * @returns {JSX.Element | null} The pricing tier action modal
 */
const PricingTierActionModal: FC<IPricingTierActionModalProps> = ({
    open,
    pricingTier,
    action,
    loading,
    error,
    onConfirm,
    onCancel,
    onAfterClose
}) => {
    const config = action ? PRICING_TIER_ACTION_CONFIG[action] : undefined;

    if (!config || !pricingTier) return null;

    return (
        <ActionModal
            open={open}
            error={error}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            danger={config.danger}
            onAfterClose={onAfterClose}
            description={config.description}
        />
    );
};

export default PricingTierActionModal;
