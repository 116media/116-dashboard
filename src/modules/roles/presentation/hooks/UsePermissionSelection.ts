import { useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";

/**
 * Toggles select-all for a set of permissions.
 */
const toggleSelectAll = (
    checked: Set<string>,
    setter: (value: Set<string>) => void,
    items: IPermissionEntity[]
) => {
    setter(checked.size === items.length ? new Set() : new Set(items.map((p) => p.id)));
};

interface IUsePermissionSelection {
    checkedAvailable: Set<string>;
    checkedAssigned: Set<string>;
    toggleAvailable: (id: string, checked: boolean) => void;
    toggleAssigned: (id: string, checked: boolean) => void;
    selectAllAvailable: (permissions: IPermissionEntity[]) => void;
    selectAllAssigned: (permissions: IPermissionEntity[]) => void;
    resetSelection: () => void;
}

/**
 * Manages checkbox selection state for available and assigned panels.
 *
 * @description
 * Tracks which permissions are checked in each panel and provides
 * toggle, select-all, and reset handlers.
 */
export const usePermissionSelection = (): IUsePermissionSelection => {
    const [checkedAvailable, setCheckedAvailable] = useState<Set<string>>(new Set());
    const [checkedAssigned, setCheckedAssigned] = useState<Set<string>>(new Set());

    const toggleAvailable = (id: string, checked: boolean) => {
        setCheckedAvailable((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    };

    const toggleAssigned = (id: string, checked: boolean) => {
        setCheckedAssigned((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    };

    const selectAllAvailable = (permissions: IPermissionEntity[]) => {
        return toggleSelectAll(checkedAvailable, setCheckedAvailable, permissions);
    };

    const selectAllAssigned = (permissions: IPermissionEntity[]) => {
        return toggleSelectAll(checkedAssigned, setCheckedAssigned, permissions);
    };

    const resetSelection = () => {
        setCheckedAvailable(new Set());
        setCheckedAssigned(new Set());
    };

    return {
        checkedAvailable,
        checkedAssigned,
        toggleAvailable,
        toggleAssigned,
        selectAllAvailable,
        selectAllAssigned,
        resetSelection
    };
};
