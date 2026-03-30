import { Col, Collapse, Flex, Row, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IPermission } from "@/modules/auth/domain/entities/IPermission";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import { IconCaretRightOutlined, IconSafetyOutlined } from "@/shared/presentation/ui/Icons";
import { TextTransform } from "@/shared/presentation/utils/text-transform/text-transform.utils";
import styles from "./index.module.scss";

const { Text } = Typography;

/** Maps permission action names to Ant Design Tag color values. */
const ACTION_TAG_COLORS: Record<string, string> = {
    read: "blue",
    write: "orange",
    delete: "red",
    all: "default"
};

function getActionColor(action: string): string {
    return ACTION_TAG_COLORS[action] ?? "default";
}

/**
 * Props for the RoleCard component.
 *
 * @interface IRoleCardProps
 * @property {IRoleWithPermissions} role - Role data with nested permissions
 * @property {boolean} [defaultOpen] - Whether the panel is expanded on mount
 */
interface IRoleCardProps {
    role: IRoleWithPermissions;
    defaultOpen?: boolean;
}

/**
 * Collapsible card displaying a role and its permissions.
 *
 * @component
 *
 * @description
 * Renders a role as a Collapse panel with the role name, permission count,
 * and active status in the header. When expanded, shows permissions in a
 * grid layout with resource name, action tags, and description columns.
 */
const RoleCard: FC<IRoleCardProps> = ({ role, defaultOpen = false }) => {
    const label = (
        <Flex align="center" gap={12} className={styles.role__label}>
            <IconSafetyOutlined className={styles.role__icon} />
            <div className={styles.role__info}>
                <Flex align="center" gap={8}>
                    <Text strong>{TextTransform.capitalCase(role.name)}</Text>
                    <Tag color="" variant="filled">
                        {role.permissions.length} permission
                        {role.permissions.length > 1 ? "s" : ""}
                    </Tag>
                </Flex>
                <Text type="secondary" style={{ fontSize: 12, marginTop: 2 }}>
                    {role.description}
                </Text>
            </div>
            <Tag color={role.isActive ? "success" : "default"} variant="outlined">
                {role.isActive ? "Actif" : "Inactif"}
            </Tag>
        </Flex>
    );

    const children =
        role.permissions.length > 0 ? (
            <Flex vertical gap={8}>
                {role.permissions.map((perm: IPermission) => (
                    <Row
                        key={perm.id}
                        gutter={12}
                        align="middle"
                        className={styles.role__permission}
                    >
                        <Col span={4}>
                            <Text strong className={styles.role__resource}>
                                {perm.resource}
                            </Text>
                        </Col>
                        <Col span={8}>
                            <Flex gap={6} wrap>
                                {perm.action
                                    .split(",")
                                    .map((a) => a.trim())
                                    .map((action) => (
                                        <Tag
                                            key={action}
                                            color={getActionColor(action)}
                                            variant="filled"
                                        >
                                            {action}
                                        </Tag>
                                    ))}
                            </Flex>
                        </Col>
                        <Col span={12}>
                            <Text type="secondary" className={styles.role__permDescription}>
                                {perm.description}
                            </Text>
                        </Col>
                    </Row>
                ))}
            </Flex>
        ) : (
            <Text type="secondary">Aucune permission</Text>
        );

    return (
        <Collapse
            className={styles.role}
            defaultActiveKey={defaultOpen ? [role.id] : []}
            expandIcon={({ isActive }) => (
                <IconCaretRightOutlined
                    className={`${styles.role__chevron} ${isActive ? styles.role__chevronOpen : ""}`}
                />
            )}
            items={[{ key: role.id, label, children }]}
        />
    );
};

export default RoleCard;
