import { Button, Menu, Popover, Tooltip } from "antd";
import { type FC, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { INavigationChildItem } from "@/shared/presentation/constants/navigation";

import styles from "./index.module.scss";

/**
 * Props for the NavPopoverMenu component.
 *
 * @interface INavPopoverMenuProps
 * @property {string} label - Tooltip and popover title text
 * @property {FC} icon - Icon component for the trigger button
 * @property {boolean} isActive - Whether the parent nav item is active
 * @property {string} className - CSS class for the trigger button
 * @property {INavigationChildItem[]} items - Visible child navigation items
 */
interface INavPopoverMenuProps {
    icon: FC;
    label: string;
    isActive: boolean;
    className: string;
    items: INavigationChildItem[];
}

/**
 * Popover menu for grouped SideNav items.
 *
 * @component
 *
 * @description
 * Renders a trigger button that opens a Popover with a vertical
 * Menu of child navigation items. Each item navigates to its
 * route on click. The active item is highlighted based on the
 * current URL pathname.
 *
 * Used by the SideNav for navigation groups like Références,
 * Catalogue, Édition, etc.
 *
 * @param {INavPopoverMenuProps} props - Component props
 * @returns {JSX.Element} The popover menu trigger and content
 */
const NavPopoverMenu: FC<INavPopoverMenuProps> = ({
    label,
    icon: Icon,
    isActive,
    className,
    items
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <Popover
            open={open}
            trigger="click"
            placement="right"
            onOpenChange={setOpen}
            content={
                <div className={styles.navPopoverMenu}>
                    <div className={styles.navPopoverMenu__title}>{label}</div>
                    <Menu
                        mode="vertical"
                        selectedKeys={[location.pathname]}
                        items={items.map((child) => ({
                            key: child.path,
                            label: child.label,
                            icon: <child.icon />,
                            onClick: () => {
                                navigate(child.path);
                                setOpen(false);
                            }
                        }))}
                    />
                </div>
            }
        >
            <Tooltip title={label} placement="right">
                <Button
                    size="large"
                    icon={<Icon />}
                    className={className}
                    type={isActive ? "primary" : "text"}
                />
            </Tooltip>
        </Popover>
    );
};

export default NavPopoverMenu;
