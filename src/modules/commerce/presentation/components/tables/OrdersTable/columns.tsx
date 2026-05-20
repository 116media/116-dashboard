import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import {
    ORDER_DROPDOWN_ITEMS,
    type OrderAction
} from "@/modules/commerce/presentation/constants/commerce.orders.dropdown";
import { ORDER_STATUS_CONFIG } from "@/modules/commerce/presentation/constants/order.status.config";
import type { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import { Colors } from "@/shared/presentation/constants/theme";
import { IconStopOutlined } from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const { Text } = Typography;

export type { OrderAction };

/**
 * Generates Ant Design table column definitions for the orders table.
 *
 * @description
 * Builds columns for customer name, amount, item count, creation date,
 * status tag, and an actions dropdown. The dropdown items are filtered
 * based on order status and the current user's role.
 *
 * @param onAction - Callback when a row action is triggered
 * @param isSuperAdmin - Whether the current user is a SuperAdmin
 * @param isAdminOrSuperAdmin - Whether the current user is Admin or SuperAdmin
 * @returns Column configuration for the Ant Design Table
 */
export const ordersTableColumns = (
    onAction: (action: OrderAction, order: IOrderSummaryEntity) => void,
    isSuperAdmin: boolean,
    isAdminOrSuperAdmin: boolean
): ColumnsType<IOrderSummaryEntity> => [
    {
        title: "Client",
        dataIndex: "customerName",
        key: "customerName",
        width: 180,
        ellipsis: true,
        sorter: (a, b) => a.customerName.localeCompare(b.customerName),
        render: (name: string) => <Text strong>{name}</Text>
    },
    {
        title: "Montant (USD)",
        dataIndex: "totalAmountUsd",
        key: "totalAmountUsd",
        width: 130,
        align: "right",
        sorter: (a, b) => a.totalAmountUsd - b.totalAmountUsd,
        render: (amount: number) => <Text>${amount.toFixed(2)}</Text>
    },
    {
        title: "Produits",
        dataIndex: "itemCount",
        key: "itemCount",
        width: 100,
        align: "center"
    },
    {
        title: "Créée le",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY hh:mm")}</Text>
            ) : (
                <IconStopOutlined style={{ color: Colors.Error, fontSize: 18 }} />
            )
    },
    {
        title: "Statut",
        dataIndex: "status",
        key: "status",
        width: 160,
        render: (status: OrderStatus) => <StatusTag status={status} config={ORDER_STATUS_CONFIG} />
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IOrderSummaryEntity) => {
            const items: ITableActionItem[] = ORDER_DROPDOWN_ITEMS.map((item) => ({
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
