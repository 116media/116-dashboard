import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import {
    CATEGORY_DROPDOWN_ITEMS,
    type CategoryAction
} from "@/modules/catalog/presentation/constants/catalog.categories.dropdown";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconCheckCircleFilled, IconCloseCircleFilled } from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";

const { Text } = Typography;

export type { CategoryAction };

/**
 * Generates Ant Design table column definitions for the categories table.
 *
 * @description
 * Defines columns for name, content type, free status, active status,
 * and an action dropdown. Mutation actions are hidden based on
 * authorization level.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const categoriesTableColumns = (
    onAction: (action: CategoryAction, category: ICategoryEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<ICategoryEntity> => [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Type de contenu",
        dataIndex: "contentTypeName",
        key: "contentTypeName",
        width: 150,
        sorter: (a, b) => a.contentTypeName.localeCompare(b.contentTypeName)
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 300,
        ellipsis: true,
        render: (description: string | null) => <Text type="secondary">{description ?? "—"}</Text>
    },
    {
        title: "Gratuit",
        dataIndex: "isFree",
        key: "isFree",
        width: 100,
        align: "center",
        render: (isFree: boolean) =>
            isFree ? (
                <IconCheckCircleFilled style={{ color: Colors.Success, fontSize: 18 }} />
            ) : (
                <IconCloseCircleFilled style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Statut",
        dataIndex: "isActive",
        key: "status",
        width: 100,
        fixed: "end",
        align: "center",
        render: (_: boolean, record: ICategoryEntity) => (
            <StatusTag status={record.isActive ? "active" : "inactive"} />
        )
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: ICategoryEntity) => {
            const items: ITableActionItem[] = CATEGORY_DROPDOWN_ITEMS.map((item) => ({
                key: item.key,
                label: item.label,
                danger: item.danger,
                hidden: item.hidden(record, isSuperAdmin, isAdminOrSuperAdmin),
                onClick: () => onAction(item.key, record)
            }));

            return <TableActionDropdown items={items} />;
        }
    }
];
