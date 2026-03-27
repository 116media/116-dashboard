import { Collapse, Empty, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { FC } from "react";
import type { IPermission } from "@/modules/auth/domain/entities/IPermission";
import type { IRoleWithPermissions } from "@/platform/settings/domain/entities/IRoleWithPermissions";
import styles from "./index.module.scss";

interface IRoleCardProps {
    role: IRoleWithPermissions;
}

const columns: ColumnsType<IPermission> = [
    {
        title: "Ressource",
        dataIndex: "resource",
        width: "25%"
    },
    {
        title: "Action",
        dataIndex: "action",
        width: "20%",
        render: (action: string) => <Tag>{action}</Tag>
    },
    {
        title: "Description",
        dataIndex: "description",
        width: "40%"
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        width: "15%",
        render: (isActive: boolean) => (
            <Tag color={isActive ? "green" : "red"}>{isActive ? "Actif" : "Inactif"}</Tag>
        )
    }
];

const RoleCard: FC<IRoleCardProps> = ({ role }) => {
    return (
        <Collapse
            className={styles.collapse}
            items={[
                {
                    key: role.id,
                    label: (
                        <div className={styles.header}>
                            <span className={styles.name}>{role.name}</span>
                            <span className={styles.description}>{role.description}</span>
                            <Tag color={role.isActive ? "green" : "red"}>
                                {role.isActive ? "Actif" : "Inactif"}
                            </Tag>
                        </div>
                    ),
                    children:
                        role.permissions.length > 0 ? (
                            <Table
                                columns={columns}
                                dataSource={role.permissions}
                                rowKey="id"
                                size="small"
                                pagination={false}
                            />
                        ) : (
                            <Empty description="Aucune permission" />
                        )
                }
            ]}
        />
    );
};

export default RoleCard;
