import type { PaymentMethodFilter } from "@/modules/commerce/presentation/hooks/UsePaymentsList";
import { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";
import { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";
import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the payments list.
 */
export type PaymentStatusFilter = "all" | PaymentStatus;

/**
 * Status filter options for the payments table toolbar.
 *
 * @description
 * Payment-focused options showing payment verification statuses.
 * Passed to the generic `TableToolbar` component.
 */
export const PAYMENT_STATUS_OPTIONS: IStatusOption<PaymentStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: PaymentStatus.Pending, label: "En attente" },
    { value: PaymentStatus.Verified, label: "Vérifié" },
    { value: PaymentStatus.Rejected, label: "Rejeté" }
];

/**
 * Payment method filter options for the payments table toolbar.
 *
 * @description
 * Options for filtering by payment method. Includes "all" to
 * show all methods.
 */
export const PAYMENT_METHOD_FILTER_OPTIONS: IStatusOption<PaymentMethodFilter>[] = [
    { value: "all", label: "Tous" },
    { value: PaymentMethod.BankTransfer, label: "Virement" },
    { value: PaymentMethod.MobileMoney, label: "Mobile Money" },
    { value: PaymentMethod.Cash, label: "Espèces" }
];
