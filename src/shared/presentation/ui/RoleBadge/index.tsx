import { Badge, Tag } from "antd";
import type { FC } from "react";
import type { IRole } from "@/modules/auth/domain/entities/IRole";
import styles from "./index.module.scss";

interface IRoleBadgeProps {
    roles: IRole[];
    compact?: boolean;
    onClick?: () => void;
}

const RoleBadge: FC<IRoleBadgeProps> = ({ roles, compact, onClick }) => {
    const className = compact
        ? `${styles.roleBadge} ${styles.roleBadge__compact}`
        : styles.roleBadge;

    return (
        <button type="button" className={className} onClick={onClick}>
            <Tag variant="outlined" className={styles.roleBadge__tag}>
                {roles?.[0]?.name}
            </Tag>

            {roles?.length >= 1 && (
                <Badge size="small" color="volcano" offset={[-6, -20]} count={roles.length} />
            )}
        </button>
    );
};

export default RoleBadge;
