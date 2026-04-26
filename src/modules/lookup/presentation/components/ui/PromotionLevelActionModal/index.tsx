import type { FC } from "react";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import { PROMOTION_LEVEL_ACTION_CONFIG } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.config";
import type { PromotionLevelAction } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the PromotionLevelActionModal component.
 *
 * @interface IPromotionLevelActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IPromotionLevelEntity | null} promotionLevel - The promotion level being acted upon
 * @property {PromotionLevelAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IPromotionLevelActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    promotionLevel: IPromotionLevelEntity | null;
    action: PromotionLevelAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for promotion level activate and deactivate actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps promotion level action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IPromotionLevelActionModalProps} props - Component props
 * @returns {JSX.Element | null} The promotion level action modal
 */
const PromotionLevelActionModal: FC<IPromotionLevelActionModalProps> = ({
    open,
    promotionLevel,
    action,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? PROMOTION_LEVEL_ACTION_CONFIG[action] : undefined;

    if (!config || !promotionLevel) return null;

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

export default PromotionLevelActionModal;
