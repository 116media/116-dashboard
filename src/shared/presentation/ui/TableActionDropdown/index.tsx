import { Button, Dropdown, Flex } from "antd";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { IconSettingOutlined } from "@/shared/presentation/ui/Icons";

/**
 * Single action item in the table row dropdown menu.
 *
 * @interface ITableActionItem
 * @property {string} key - Unique identifier for the action
 * @property {string} label - French display label
 * @property {ReactNode} [icon] - Optional icon component
 * @property {boolean} [danger] - Renders the item in red
 * @property {() => void} onClick - Action handler
 * @property {boolean} [hidden] - Conditionally hides the item
 */
export interface ITableActionItem {
    key: string;
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    hidden?: boolean;
    onClick: () => void;
}

/**
 * Props for the TableActionDropdown component.
 *
 * @interface ITableActionDropdownProps
 * @property {ITableActionItem[]} items - Available actions for the row
 */
export interface ITableActionDropdownProps {
    items: ITableActionItem[];
}

/**
 * Dropdown menu for table row actions.
 *
 * @component
 *
 * @description
 * Renders a vertical three-dot (⋮) button that opens a dropdown
 * menu with action items. Items with `hidden: true` are filtered out.
 * Items with `danger: true` render in red.
 *
 * @param {ITableActionDropdownProps} props - Component props
 * @returns {JSX.Element} The action dropdown
 */
const TableActionDropdown: FC<ITableActionDropdownProps> = ({ items }) => {
    const menuItems = useMemo(
        () =>
            items
                .filter((item) => !item.hidden)
                .map((item) => ({
                    key: item.key,
                    label: item.label,
                    icon: item.icon,
                    danger: item.danger,
                    onClick: item.onClick
                })),
        [items]
    );

    return (
        <Flex justify="center" align="center">
            <Dropdown arrow trigger={["click"]} placement="bottom" menu={{ items: menuItems }}>
                <Button
                    type="text"
                    icon={<IconSettingOutlined />}
                    onClick={(e) => e.stopPropagation()}
                />
            </Dropdown>
        </Flex>
    );
};

export default TableActionDropdown;
