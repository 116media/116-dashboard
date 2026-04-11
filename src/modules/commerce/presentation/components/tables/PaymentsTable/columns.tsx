import { Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import OrderStatusTag from "@/modules/commerce/presentation/components/ui/OrderStatusTag";
import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const { Text } = Typography;

/**
 * Action types available on the payments table.
 */
export type PaymentAction = "view";

/**
 * Generates Ant Design table column definitions for the pending payments table.
 *
 * @description
 * Displays orders in PendingPayment status with customer name, amount,
 * item count, creation date, and a view action. Simplified compared to
 * the full orders table since all rows share the same status.
 *
 * @param onView - Callback when the user clicks "Voir détails"
 * @returns Column configuration for the Ant Design Table
 */
export const paymentsTableColumns = (
    onView: (order: IOrderSummaryEntity) => void
): ColumnsType<IOrderSummaryEntity> => [
    {
        title: "Client",
        dataIndex: "customerName",
        key: "customerName",
        width: 200,
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
        title: "Articles",
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
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Statut",
        dataIndex: "status",
        key: "status",
        width: 160,
        align: "center",
        render: (status: EnumOrderStatus) => <OrderStatusTag status={status} />
    },
    {
        title: "Actions",
        key: "actions",
        width: 100,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IOrderSummaryEntity) => (
            <a onClick={() => onView(record)}>Voir détails</a>
        )
    }
];
