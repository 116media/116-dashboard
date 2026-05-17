import { Button, Dropdown, Space } from "antd";
import type { FC } from "react";
import { IconEllipsisOutlined } from "@/shared/presentation/ui/Icons";

export interface ISplitActionItem {
    key: string;
    label: string;
    danger?: boolean;
    hidden?: boolean;
    onClick: () => void;
}

interface ISplitActionButtonProps {
    label?: string;
    loading?: boolean;
    items: ISplitActionItem[];
    onPrimaryClick?: () => void;
}

/**
 * Split button with a primary action and a dropdown for secondary actions.
 *
 * @component
 *
 * @description
 * Renders an Ant Design `Space.Compact` with a main "Actions" button
 * and an ellipsis dropdown for additional actions. Each item can be
 * marked as `danger` for destructive operations.
 */
const SplitActionButton: FC<ISplitActionButtonProps> = ({
    items,
    loading,
    label = "Actions",
    onPrimaryClick
}) => {
    const visibleItems = items.filter((item) => !item.hidden);

    if (visibleItems.length === 0) return null;

    const menuItems = visibleItems.map((item) => ({
        key: item.key,
        label: item.label,
        danger: item.danger
    }));

    const handleMenuClick = ({ key }: { key: string }) => {
        const item = visibleItems.find((i) => i.key === key);
        item?.onClick();
    };

    return (
        <Space.Compact>
            <Button loading={loading} onClick={onPrimaryClick ?? visibleItems[0]?.onClick}>
                {label}
            </Button>
            <Dropdown placement="bottomRight" menu={{ items: menuItems, onClick: handleMenuClick }}>
                <Button icon={<IconEllipsisOutlined />} />
            </Dropdown>
        </Space.Compact>
    );
};

export default SplitActionButton;
