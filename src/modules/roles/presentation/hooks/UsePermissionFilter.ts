import { useMemo, useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";

/**
 * Filters permissions by resource and search query.
 */
const filterPermissions = (
    items: IPermissionEntity[],
    resource: string | null,
    search: string
): IPermissionEntity[] => {
    let filtered = items;
    if (resource) filtered = filtered.filter((p) => p.resource === resource);
    if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.resource.toLowerCase().includes(q) ||
                p.action.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
        );
    }
    return filtered;
};

interface IUsePermissionFilter {
    resources: string[];
    activeResource: string | null;
    availableSearch: string;
    assignedSearch: string;
    availablePermissions: IPermissionEntity[];
    assignedPermissions: IPermissionEntity[];
    setAvailableSearch: (value: string) => void;
    setAssignedSearch: (value: string) => void;
    handleTabClick: (resource: string | null) => void;
    resetFilters: () => void;
}

/**
 * Manages resource tab filtering and search for permission panels.
 *
 * @description
 * Derives unique resource names, filters available and assigned
 * permissions by the active resource tab and search queries.
 *
 * @param permissions - All permissions in the system
 * @param assignedIds - Set of currently assigned permission IDs
 */
export const usePermissionFilter = (
    permissions: IPermissionEntity[],
    assignedIds: Set<string>
): IUsePermissionFilter => {
    const [activeResource, setActiveResource] = useState<string | null>(null);
    const [availableSearch, setAvailableSearch] = useState("");
    const [assignedSearch, setAssignedSearch] = useState("");

    const resources = useMemo(
        () => [...new Set(permissions.map((p) => p.resource))].sort(),
        [permissions]
    );

    const availablePermissions = useMemo(
        () =>
            filterPermissions(
                permissions.filter((p) => !assignedIds.has(p.id)),
                activeResource,
                availableSearch
            ),
        [permissions, assignedIds, activeResource, availableSearch]
    );

    const assignedPermissions = useMemo(
        () =>
            filterPermissions(
                permissions.filter((p) => assignedIds.has(p.id)),
                activeResource,
                assignedSearch
            ),
        [permissions, assignedIds, activeResource, assignedSearch]
    );

    const resetFilters = () => {
        setAvailableSearch("");
        setAssignedSearch("");
    };

    const handleTabClick = (resource: string | null) => {
        setActiveResource(resource);
        resetFilters();
    };

    return {
        resources,
        activeResource,
        availableSearch,
        assignedSearch,
        availablePermissions,
        assignedPermissions,
        setAvailableSearch,
        setAssignedSearch,
        handleTabClick,
        resetFilters
    };
};
