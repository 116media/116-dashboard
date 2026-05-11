import { Button, Select } from "antd";
import type { IStatusOption } from "@/shared/domain/types/pagination";
import { IconFilterOutlined } from "../Icons";

/**
 * Props for the TableStatusFilter component.
 *
 * @interface ITableStatusFilterProps
 * @template T - The status value type (module-specific)
 *
 * @property {T} value - Currently selected status value
 * @property {(value: T) => void} onChange - Called when the user selects a new status
 * @property {IStatusOption<T>[]} options - Available status options with French labels
 * @property {boolean} [loading] - Shows a loading spinner on the select
 */
export interface ITableStatusFilterProps<T extends string = string> {
    value: T;
    onChange: (value: T) => void;
    options: IStatusOption<T>[];
    loading?: boolean;
}

/**
 * Generic dropdown select for filtering by status.
 *
 * @component
 *
 * @description
 * Renders an Ant Design `Select` dropdown with status options.
 * The component is fully generic — each module defines its own
 * status values and labels. Videos, articles, roles, and permissions
 * can all use this with their own status types.
 *
 * @template T - The status value type
 * @param {ITableStatusFilterProps<T>} props - Component props
 * @returns {JSX.Element} The status filter dropdown
 */
function TableStatusFilter<T extends string = string>({
    value,
    onChange,
    options,
    loading
}: ITableStatusFilterProps<T>) {
    return (
        <Select
            value={value}
            loading={loading}
            disabled={loading}
            onChange={onChange}
            popupMatchSelectWidth={false}
            prefix={<Button type="text" size="small" icon={<IconFilterOutlined />} />}
            options={options.map((opt) => ({
                value: opt.value,
                label: opt.label
            }))}
        />
    );
}

export default TableStatusFilter;
