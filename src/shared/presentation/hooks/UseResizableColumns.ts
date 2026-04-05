import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

/**
 * Hook for making Ant Design table columns resizable.
 *
 * @description
 * Stores the full columns array in state so that width updates
 * during drag mutate the columns directly — matching the pattern
 * recommended by react-resizable for Ant Design tables.
 *
 * @template T - The table record type
 * @param {ColumnsType<T>} initialColumns - Static column definitions (used as initial state)
 * @returns columns with onHeaderCell wired, and a handleResize factory
 *
 * @example
 * ```tsx
 * const { columns, handleResize } = useResizableColumns(
 *     contentTypesTableColumns(handleAction, isSuperAdmin)
 * );
 *
 * const tableColumns = columns.map((col, index) => ({
 *     ...col,
 *     onHeaderCell: (column) => ({
 *         width: column.width,
 *         onResize: handleResize(index)
 *     })
 * }));
 *
 * <Table columns={tableColumns} components={{ header: { cell: ResizableTitle } }} />
 * ```
 */
export const useResizableColumns = <T extends object>(initialColumns: ColumnsType<T>) => {
    const [columns, setColumns] = useState(initialColumns);

    const handleResize =
        (index: number) =>
        (_: React.SyntheticEvent, { size }: { size: { width: number } }) => {
            setColumns((prev) => {
                const next = [...prev];
                next[index] = { ...next[index], width: size.width };
                return next;
            });
        };

    const tableColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: () => ({
            width: col.width,
            onResize: handleResize(index)
        })
    })) as ColumnsType<T>;

    return { columns: tableColumns };
};
