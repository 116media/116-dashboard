import type { FC } from "react";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Action configuration mapping for each role action type.
 */
const ACTION_CONFIG: Record<
    Exclude<RoleAction, "edit" | "assignPermission" | "removePermission">,
    { title: string; description: string; danger: boolean }
> = {
    activate: {
        title: "Activer le rôle",
        description: "Êtes-vous sûr de vouloir activer ce rôle ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver le rôle",
        description: "Les utilisateurs avec ce rôle perdront les permissions associées.",
        danger: false
    },
    softDelete: {
        title: "Supprimer le rôle",
        description:
            "Le rôle sera désactivé et marqué comme supprimé. Cette action est réversible.",
        danger: true
    },
    hardDelete: {
        title: "Supprimer définitivement",
        description:
            "Cette action est irréversible. Le rôle et toutes ses associations seront supprimés.",
        danger: true
    },
    restore: {
        title: "Restaurer le rôle",
        description: "Le rôle sera restauré et pourra être réactivé.",
        danger: false
    }
};

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
    role: IRoleEntity | null;
    action: RoleAction | null;
    loading: boolean;
    error: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
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
    if (
        !action ||
        action === "edit" ||
        action === "assignPermission" ||
        action === "removePermission" ||
        !role
    ) {
        return null;
    }

    const config = ACTION_CONFIG[action];

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
