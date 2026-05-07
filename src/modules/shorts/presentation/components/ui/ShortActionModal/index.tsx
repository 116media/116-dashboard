import type { FC } from "react";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ShortAction } from "@/modules/shorts/presentation/constants/shorts.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Action configuration for short video workflow modals.
 */
const SHORT_ACTION_CONFIG: Record<
    string,
    { title: string; description: string; confirmLabel: string; danger?: boolean }
> = {
    activate: {
        title: "Activer le court-m\u00e9trage",
        description: "\u00cates-vous s\u00fbr de vouloir activer ce court-m\u00e9trage ?",
        confirmLabel: "Activer"
    },
    deactivate: {
        title: "D\u00e9sactiver le court-m\u00e9trage",
        description: "\u00cates-vous s\u00fbr de vouloir d\u00e9sactiver ce court-m\u00e9trage ?",
        confirmLabel: "D\u00e9sactiver",
        danger: true
    },
    delete: {
        title: "Supprimer le court-m\u00e9trage",
        description:
            "\u00cates-vous s\u00fbr de vouloir supprimer d\u00e9finitivement ce court-m\u00e9trage ? Cette action est irr\u00e9versible.",
        confirmLabel: "Supprimer",
        danger: true
    }
};

/**
 * Props for the ShortActionModal component.
 *
 * @interface IShortActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {ShortAction | null} action - The action type
 * @property {IShortVideoEntity | null} short - The short video being acted upon
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error to display
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IShortActionModalProps {
    open: boolean;
    action: ShortAction | null;
    short: IShortVideoEntity | null;
    loading: boolean;
    error?: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Confirmation modal for short video actions.
 *
 * @component
 *
 * @description
 * Maps short action types to French titles, descriptions, and danger
 * styling via `SHORT_ACTION_CONFIG`. Delegates rendering to the shared
 * `ActionModal` component.
 *
 * @param {IShortActionModalProps} props - Component props
 * @returns {JSX.Element | null} The action modal, or null if no config/short
 */
const ShortActionModal: FC<IShortActionModalProps> = ({
    open,
    action,
    short,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? SHORT_ACTION_CONFIG[action] : undefined;

    if (!config || !short) return null;

    return (
        <ActionModal
            open={open}
            error={error ?? null}
            loading={loading}
            onCancel={onCancel}
            title={config.title}
            onConfirm={onConfirm}
            danger={config.danger}
            confirmLabel={config.confirmLabel}
            description={config.description}
        />
    );
};

export default ShortActionModal;
