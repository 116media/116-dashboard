import type { FC } from "react";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { TAG_ACTION_CONFIG } from "@/modules/lookup/presentation/constants/lookup.tags.config";
import type { TagAction } from "@/modules/lookup/presentation/constants/lookup.tags.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the TagActionModal component.
 *
 * @interface ITagActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {ITagEntity | null} tag - The tag being acted upon
 * @property {TagAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface ITagActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onAfterClose?: () => void;
    tag: ITagEntity | null;
    action: TagAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for tag delete action.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps tag action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {ITagActionModalProps} props - Component props
 * @returns {JSX.Element | null} The tag action modal
 */
const TagActionModal: FC<ITagActionModalProps> = ({
    open,
    tag,
    action,
    loading,
    error,
    onConfirm,
    onCancel,
    onAfterClose
}) => {
    const config = action ? TAG_ACTION_CONFIG[action] : undefined;

    if (!config || !tag) return null;

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

export default TagActionModal;
