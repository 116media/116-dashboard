import type { FC } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { CATEGORY_ACTION_CONFIG } from "@/modules/catalog/presentation/constants/catalog.categories.config";
import type { CategoryAction } from "@/modules/catalog/presentation/constants/catalog.categories.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the CategoryActionModal component.
 *
 * @interface ICategoryActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {ICategoryEntity | null} category - The category being acted upon
 * @property {CategoryAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface ICategoryActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    category: ICategoryEntity | null;
    action: CategoryAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for category activate and deactivate actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps category action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {ICategoryActionModalProps} props - Component props
 * @returns {JSX.Element | null} The category action modal
 */
const CategoryActionModal: FC<ICategoryActionModalProps> = ({
    open,
    category,
    action,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? CATEGORY_ACTION_CONFIG[action] : undefined;

    if (!config || !category) return null;

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

export default CategoryActionModal;
