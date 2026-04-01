import { useCallback, useEffect, useMemo, useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import { usePermissionFilter } from "./UsePermissionFilter";
import { usePermissionSelection } from "./UsePermissionSelection";

/**
 * Checks if two sets contain the same elements.
 */
const setsEqual = (a: Set<string>, b: Set<string>): boolean => {
    if (a.size !== b.size) return false;
    for (const item of a) {
        if (!b.has(item)) return false;
    }
    return true;
};

interface IUseBulkPermissionTransfer {
    resources: string[];
    activeResource: string | null;
    availablePermissions: IPermissionEntity[];
    assignedPermissions: IPermissionEntity[];
    checkedAvailable: Set<string>;
    checkedAssigned: Set<string>;
    availableSearch: string;
    assignedSearch: string;
    hasPendingChanges: boolean;
    totalAssigned: number;
    handleAssign: () => void;
    handleRemove: () => void;
    handleTabClick: (resource: string | null) => void;
    handleCancel: () => void;
    handleSave: () => void;
    toggleAvailable: (id: string, checked: boolean) => void;
    toggleAssigned: (id: string, checked: boolean) => void;
    selectAllAvailable: () => void;
    selectAllAssigned: () => void;
    setAvailableSearch: (value: string) => void;
    setAssignedSearch: (value: string) => void;
}

/**
 * Orchestrates local transfer state for bulk permission assignment.
 *
 * @description
 * Composes `usePermissionSelection` and `usePermissionFilter` to manage
 * the full transfer workflow. No API calls are made until `handleSave`
 * is invoked — all changes are local until then.
 *
 * @param role - The role with its current permissions
 * @param permissions - All available permissions
 * @param onSave - Callback with the final assigned permission IDs
 * @param onCancel - Callback to close/reset the modal
 */
export const useBulkPermissionTransfer = (
    role: IRoleWithPermissions | null,
    permissions: IPermissionEntity[],
    onSave: (permissionIds: string[]) => void,
    onCancel: () => void
): IUseBulkPermissionTransfer => {
    const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set());
    const [initialIds, setInitialIds] = useState<Set<string>>(new Set());

    const selection = usePermissionSelection();
    const filter = usePermissionFilter(permissions, assignedIds);

    useEffect(() => {
        if (role?.permissions) {
            const ids = new Set(role.permissions.map((p) => p.id));
            setAssignedIds(ids);
            setInitialIds(ids);
        }
    }, [role?.permissions]);

    const hasPendingChanges = useMemo(
        () => !setsEqual(assignedIds, initialIds),
        [assignedIds, initialIds]
    );

    const handleAssign = useCallback(() => {
        setAssignedIds((prev) => {
            const next = new Set(prev);
            selection.checkedAvailable.forEach((id) => {
                next.add(id);
            });
            return next;
        });
        selection.resetSelection();
    }, [selection]);

    const handleRemove = useCallback(() => {
        setAssignedIds((prev) => {
            const next = new Set(prev);
            selection.checkedAssigned.forEach((id) => {
                next.delete(id);
            });
            return next;
        });
        selection.resetSelection();
    }, [selection]);

    const handleTabClick = (resource: string | null) => {
        filter.handleTabClick(resource);
        selection.resetSelection();
    };

    const handleCancel = () => {
        setAssignedIds(initialIds);
        selection.resetSelection();
        filter.resetFilters();
        onCancel();
    };

    const handleSave = () => {
        onSave(Array.from(assignedIds));
    };

    const selectAllAvailable = () => {
        return selection.selectAllAvailable(filter.availablePermissions);
    };

    const selectAllAssigned = () => {
        return selection.selectAllAssigned(filter.assignedPermissions);
    };

    return {
        resources: filter.resources,
        activeResource: filter.activeResource,
        availablePermissions: filter.availablePermissions,
        assignedPermissions: filter.assignedPermissions,
        checkedAvailable: selection.checkedAvailable,
        checkedAssigned: selection.checkedAssigned,
        availableSearch: filter.availableSearch,
        assignedSearch: filter.assignedSearch,
        hasPendingChanges,
        totalAssigned: assignedIds.size,
        handleAssign,
        handleRemove,
        handleTabClick,
        handleCancel,
        handleSave,
        toggleAvailable: selection.toggleAvailable,
        toggleAssigned: selection.toggleAssigned,
        selectAllAvailable,
        selectAllAssigned,
        setAvailableSearch: filter.setAvailableSearch,
        setAssignedSearch: filter.setAssignedSearch
    };
};
