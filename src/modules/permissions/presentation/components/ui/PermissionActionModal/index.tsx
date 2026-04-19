import type { FC } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { PermissionAction } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Action configuration mapping for each permission action type.
 */
const ACTION_CONFIG: Record<
    Exclude<PermissionAction, "edit">,
    { title: string; description: string; danger: boolean }
> = {
    activate: {
        title: "Activer la permission",
        description: "Êtes-vous sûr de vouloir activer cette permission ?",
        danger: false
    },
    deactivate: {
        title: "Désactiver la permission",
        description: "Les rôles avec cette permission perdront l'accès associé.",
        danger: false
    },
    softDelete: {
        title: "Supprimer la permission",
        description:
            "La permission sera désactivée et marquée comme supprimée. Cette action est réversible.",
        danger: true
    },
    hardDelete: {
        title: "Supprimer définitivement",
        description:
            "Cette action est irréversible. La permission et toutes ses associations seront supprimées.",
        danger: true
    },
    restore: {
        title: "Restaurer la permission",
        description: "La permission sera restaurée et pourra être réactivée.",
        danger: false
    }
};

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
 */
interface IPermissionActionModalProps {
    open: boolean;
    permission: IPermissionEntity | null;
    action: PermissionAction | null;
    loading: boolean;
    error: Failure | null | undefined;
    onConfirm: () => void;
    onCancel: () => void;
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
    onCancel
}) => {
    if (!action || action === "edit" || !permission) {
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

export default PermissionActionModal;
