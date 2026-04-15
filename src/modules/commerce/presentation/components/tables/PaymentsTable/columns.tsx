import { Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import OrderStatusTag from "@/modules/commerce/presentation/components/ui/OrderStatusTag";
import type {
    EnumOrderStatus,
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";
import { ADMIN_PATH } from "@/shared/presentation/constants/paths";
import type { ITableActionItem } from "@/shared/presentation/ui/TableActionDropdown";
import TableActionDropdown from "@/shared/presentation/ui/TableActionDropdown";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";

const { Text } = Typography;

/**
 * French labels for payment methods.
 */
const PAYMENT_METHOD_LABELS: Record<string, string> = {
    BankTransfer: "Virement",
    MobileMoney: "Mobile Money",
    Cash: "Espèces"
};

/**
 * Action types available on the payments table.
 */
export type PaymentAction = "view";

/**
 * Generates Ant Design table column definitions for the payments table.
 *
 * @description
 * Displays payment records with customer name, order ID, amount,
 * payment method, payment status, order status, verified by/at,
 * creation date, and a view action.
 *
 * @param onView - Callback when the user clicks "Voir détails"
 * @returns Column configuration for the Ant Design Table
 */
export const paymentsTableColumns = (
    onView: (payment: IPaymentSummaryEntity) => void
): ColumnsType<IPaymentSummaryEntity> => [
    {
        title: "Commande",
        dataIndex: "orderId",
        key: "orderId",
        width: 120,
        ellipsis: true,
        render: (id: string) => <Text copyable={{ text: id }}>{id.slice(0, 8)}...</Text>
    },
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
        dataIndex: "amountUsd",
        key: "amountUsd",
        width: 150,
        align: "right",
        sorter: (a, b) => a.amountUsd - b.amountUsd,
        render: (amount: number) => <Text>${amount.toFixed(2)}</Text>
    },
    {
        title: "Mode de paiement",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        width: 150,
        align: "center",
        render: (method: EnumPaymentMethod | null) =>
            method ? (
                <Tag>{PAYMENT_METHOD_LABELS[method] ?? method}</Tag>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Statut paiement",
        dataIndex: "status",
        key: "status",
        width: 140,
        align: "center",
        render: (status: EnumPaymentStatus) => <OrderStatusTag status={status} />
    },
    {
        title: "Statut commande",
        dataIndex: "orderStatus",
        key: "orderStatus",
        width: 150,
        align: "center",
        render: (status: EnumOrderStatus) => <OrderStatusTag status={status} />
    },
    {
        title: "Vérifié par",
        dataIndex: "verifiedByUserName",
        key: "verifiedBy",
        width: 140,
        ellipsis: true,
        render: (_: string | null, record: IPaymentSummaryEntity) =>
            record.verifiedBy ? (
                <a href={`${ADMIN_PATH}/${record.verifiedBy}`}>
                    {record.verifiedByUserName ?? record.verifiedBy.slice(0, 8)}
                </a>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Vérifié le",
        dataIndex: "verifiedAt",
        key: "verifiedAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Créé le",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 160,
        render: (date: string | null) =>
            date ? (
                <Text type="secondary">{dayjs(date).format("DD/MM/YYYY HH:mm")}</Text>
            ) : (
                <Text type="secondary">—</Text>
            )
    },
    {
        title: "Actions",
        key: "actions",
        width: 80,
        fixed: "end",
        align: "center",
        render: (_: unknown, record: IPaymentSummaryEntity) => {
            const items: ITableActionItem[] = [
                {
                    key: "view",
                    label: "Voir détails",
                    onClick: () => onView(record)
                }
            ];

            return <TableActionDropdown items={items} />;
        }
    }
];
