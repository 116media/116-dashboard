import { Button, Flex } from "antd";
import type { FC } from "react";
import { IconCaretLeftOutlined, IconCaretRightOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IPermissionTransferControlsProps {
    assignDisabled: boolean;
    removeDisabled: boolean;
    onAssign: () => void;
    onRemove: () => void;
}

/**
 * Arrow buttons to transfer permissions between available and assigned panels.
 *
 * @component
 */
const PermissionTransferControls: FC<IPermissionTransferControlsProps> = ({
    assignDisabled,
    removeDisabled,
    onAssign,
    onRemove
}) => (
    <Flex vertical gap={8} align="center" justify="center" className={styles.transferControls}>
        <Button
            type="primary"
            icon={<IconCaretRightOutlined />}
            disabled={assignDisabled}
            onClick={onAssign}
        />
        <Button
            danger
            icon={<IconCaretLeftOutlined />}
            disabled={removeDisabled}
            onClick={onRemove}
        />
    </Flex>
);

export default PermissionTransferControls;
