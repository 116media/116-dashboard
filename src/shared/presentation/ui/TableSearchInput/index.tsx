import { Input } from "antd";
import type { FC } from "react";
import { IconSearchOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

/**
 * Props for the TableSearchInput component.
 *
 * @interface ITableSearchInputProps
 * @property {string} value - Controlled input value
 * @property {boolean} [loading] - Shows spinner on search icon
 * @property {(value: string) => void} onChange - Called on every keystroke
 * @property {(value: string) => void} onSearch - Called on Enter key or clear
 * @property {string} [placeholder] - Input placeholder (default: "Search....")
 */
export interface ITableSearchInputProps {
    value: string;
    loading?: boolean;
    onChange: (value: string) => void;
    onSearch: (value: string) => void;
    placeholder?: string;
}

/**
 * Search input with Enter-to-search behavior.
 *
 * @component
 *
 * @description
 * Controlled search input that triggers `onSearch` on Enter key
 * or when the user clears the input. The parent manages the value
 * and decides when to dispatch the search action.
 *
 * @param {ITableSearchInputProps} props - Component props
 * @returns {JSX.Element} The search input
 */
const TableSearchInput: FC<ITableSearchInputProps> = ({
    value,
    loading,
    onChange,
    onSearch,
    placeholder = "Search...."
}) => {
    return (
        <Input
            allowClear
            value={value}
            placeholder={placeholder}
            prefix={<IconSearchOutlined />}
            className={styles.tableSearchInput}
            onChange={(e) => onChange(e.target.value)}
            onPressEnter={() => onSearch(value)}
            onClear={() => onSearch("")}
            disabled={loading}
        />
    );
};

export default TableSearchInput;
