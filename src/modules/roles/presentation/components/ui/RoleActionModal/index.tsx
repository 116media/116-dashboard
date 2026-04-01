import type { FC } from "react";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import { ROLE_ACTION_CONFIG } from "@/modules/roles/presentation/constants/roles.actions";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the RoleActionModal component.
 *
 * @interface IRoleActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IRoleEntity | null} role - The role being acted upon
 * @property {RoleAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 */
interface IRoleActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    role: IRoleEntity | null;
    action: RoleAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for role status-change and delete actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps role action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IRoleActionModalProps} props - Component props
 * @returns {JSX.Element} The role action modal
 */
const RoleActionModal: FC<IRoleActionModalProps> = ({
    open,
    role,
    action,
    loading,
    error,
    onConfirm,
    onCancel
}) => {
    const config = action ? ROLE_ACTION_CONFIG[action] : undefined;

    if (!config || !role) return null;

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

export default RoleActionModal;
