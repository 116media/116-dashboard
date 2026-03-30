import { Button, Card, Typography } from "antd";
import type { FC, ReactNode } from "react";
import { IconEditOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

/**
 * Props for the SettingsCard component.
 *
 * @interface ISettingsCardProps
 * @property {string} title - Card title displayed in the header
 * @property {string} [subtitle] - Secondary text below the title
 * @property {ReactNode} [extra] - Additional content in the header (e.g. badge, tag)
 * @property {() => void} [onEdit] - Callback that shows an edit button when provided
 * @property {string} [editLabel] - Label for the edit button (defaults to "Modifier")
 * @property {ReactNode} children - Card body content
 */
interface ISettingsCardProps {
    title: string;
    subtitle?: string;
    extra?: ReactNode;
    onEdit?: () => void;
    editLabel?: string;
    children: ReactNode;
}

/**
 * Reusable card wrapper for settings sections.
 *
 * @component
 *
 * @description
 * Renders a titled card with an optional subtitle, edit button,
 * and extra header content. Used as the base layout for all
 * settings sections (profile, security, account).
 */
const SettingsCard: FC<ISettingsCardProps> = ({
    title,
    subtitle,
    extra,
    onEdit,
    editLabel = "Modifier",
    children
}) => {
    return (
        <Card className={styles.settingsCard}>
            <div className={styles.settingsCard__header}>
                <div>
                    <Title level={5} className={styles.settingsCard__title}>
                        {title}
                    </Title>
                    {subtitle && <Text type="secondary">{subtitle}</Text>}
                </div>
                {onEdit && (
                    <Button
                        color="default"
                        variant="filled"
                        icon={<IconEditOutlined />}
                        onClick={onEdit}
                    >
                        {editLabel}
                    </Button>
                )}
                {extra}
            </div>
            {children}
        </Card>
    );
};

export default SettingsCard;
