import type { FC } from "react";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import { PACKAGE_ACTION_CONFIG } from "@/modules/catalog/presentation/constants/catalog.packages.config";
import type { PackageAction } from "@/modules/catalog/presentation/constants/catalog.packages.dropdown";
import type { Failure } from "@/shared/domain/failures/failure";
import ActionModal from "@/shared/presentation/ui/ActionModal";

/**
 * Props for the PackageActionModal component.
 *
 * @interface IPackageActionModalProps
 * @property {boolean} open - Whether the modal is visible
 * @property {IPackageEntity | null} package - The package being acted upon
 * @property {PackageAction | null} action - The action type
 * @property {boolean} loading - Loading state for the confirm button
 * @property {Failure | null | undefined} error - Backend error
 * @property {() => void} onConfirm - Confirm handler
 * @property {() => void} onCancel - Cancel/close handler
 * @property {() => void} [onAfterClose] - Callback fired after the modal close transition completes
 */
interface IPackageActionModalProps {
    open: boolean;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onAfterClose?: () => void;
    bundle: IPackageEntity | null;
    action: PackageAction | null;
    error: Failure | null | undefined;
}

/**
 * Confirmation modal for package activate and deactivate actions.
 *
 * @component
 *
 * @description
 * Wraps the shared `ActionModal` and maps package action types to
 * French titles, descriptions, and danger styling. Delegates all
 * rendering to `ActionModal`.
 *
 * @param {IPackageActionModalProps} props - Component props
 * @returns {JSX.Element | null} The package action modal
 */
const PackageActionModal: FC<IPackageActionModalProps> = ({
    open,
    bundle,
    action,
    loading,
    error,
    onConfirm,
    onCancel,
    onAfterClose
}) => {
    const config = action ? PACKAGE_ACTION_CONFIG[action] : undefined;

    if (!config || !bundle) return null;

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

export default PackageActionModal;
