import { Flex } from "antd";
import type { IStatusOption } from "@/shared/domain/types/pagination";
import TableSearchInput from "@/shared/presentation/ui/TableSearchInput";
import TableStatusFilter from "@/shared/presentation/ui/TableStatusFilter";

import styles from "./index.module.scss";

/**
 * Props for the TableToolbar component.
 *
 * @interface ITableToolbarProps
 * @template T - The status value type (module-specific)
 *
 * @property {T} statusFilter - Currently selected status value
 * @property {(value: T) => void} onStatusFilterChange - Status filter change handler
 * @property {IStatusOption<T>[]} statusOptions - Available status options
 * @property {string} searchValue - Current search input value
 * @property {(value: string) => void} onSearchChange - Called on every search keystroke
 * @property {(value: string) => void} onSearch - Called on Enter or clear
 * @property {boolean} [searchLoading] - Disables search input during loading
 */
export interface ITableToolbarProps<T extends string = string> {
    statusFilter: T;
    onStatusFilterChange: (value: T) => void;
    statusOptions: IStatusOption<T>[];
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearch: (value: string) => void;
    searchLoading?: boolean;
}

/**
 * Toolbar row with filter button, status dropdown, and search input.
 *
 * @component
 *
 * @description
 * Renders the filter bar matching the dashboard table design:
 * filter button + status dropdown on the left, search input on the right.
 * Fully generic over the status type — each module provides its own
 * status options.
 *
 * @template T - The status value type
 * @param {ITableToolbarProps<T>} props - Component props
 * @returns {JSX.Element} The toolbar row
 */
function TableToolbar<T extends string = string>({
    statusFilter,
    onStatusFilterChange,
    statusOptions,
    searchValue,
    onSearchChange,
    onSearch,
    searchLoading
}: ITableToolbarProps<T>) {
    return (
        <Flex justify="space-between" align="center" className={styles.tableToolbar}>
            <Flex gap={8} align="center">
                <TableStatusFilter
                    value={statusFilter}
                    onChange={onStatusFilterChange}
                    options={statusOptions}
                    loading={searchLoading}
                />
            </Flex>
            <TableSearchInput
                value={searchValue}
                onChange={onSearchChange}
                onSearch={onSearch}
                loading={searchLoading}
            />
        </Flex>
    );
}

export default TableToolbar;
