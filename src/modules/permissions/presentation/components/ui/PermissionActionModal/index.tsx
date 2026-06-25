import type { FC } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { PermissionAction } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";
import { PERMISSION_ACTION_CONFIG } from "@/modules/permissions/presentation/constants/permissions.config";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the PermissionActionModal component.
 *
 * @interface IPermissionActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IPermissionEntity | null} permission - The permission being acted upon
 * @property {PermissionAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} [onAfterClose] - Callback fired after the modal close transition completes
 */
interface IPermissionActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    action: PermissionAction | null;
    error: Failure | null | undefined;
    permission: IPermissionEntity | null;
    onAfterClose?: () => void;
}

/**
 * Confirmation modal for permission status-change and delete actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps permission action types
 * to French titles, descriptions, and danger styling.
 *
 * @param {IPermissionActionModalProps} props - Component props
 * @returns {JSX.Element | null} The permission action modal
 */
const PermissionActionModal: FC<IPermissionActionModalProps> = ({
    open,
    permission,
    action,
    loading,
    error,
    onConfirm,
    onCancel,
    onAfterClose
}) => {
    const config = action ? PERMISSION_ACTION_CONFIG[action] : undefined;

    if (!config || !permission) return null;

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

export default PermissionActionModal;
