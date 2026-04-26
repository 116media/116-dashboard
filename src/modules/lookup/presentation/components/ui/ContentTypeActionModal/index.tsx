import type { FC } from "react";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import { CONTENT_TYPE_ACTION_CONFIG } from "@/modules/lookup/presentation/constants/lookup.content-types.config";
import type { ContentTypeAction } from "@/modules/lookup/presentation/constants/lookup.content-types.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the ContentTypeActionModal component.
 *
 * @interface IContentTypeActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IContentTypeEntity | null} contentType - The content type being acted upon
 * @property {ContentTypeAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IContentTypeActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    contentType: IContentTypeEntity | null;
    action: ContentTypeAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for content type activate and deactivate actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps content type action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IContentTypeActionModalProps} props - Component props
 * @returns {JSX.Element | null} The content type action modal
 */
const ContentTypeActionModal: FC<IContentTypeActionModalProps> = ({
    open,
    contentType,
    action,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? CONTENT_TYPE_ACTION_CONFIG[action] : undefined;

    if (!config || !contentType) return null;

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

export default ContentTypeActionModal;
