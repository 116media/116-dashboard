import type { PaymentMethodFilter } from "@/modules/commerce/presentation/hooks/UsePaymentsList";
import type { IStatusOption } from "@/shared/domain/types/pagination";
import {
    EnumPaymentMethod,
    EnumPaymentStatus
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Status filter values for the payments list.
 */
export type PaymentStatusFilter = "all" | EnumPaymentStatus;

/**
 * Status filter options for the payments table toolbar.
 *
 * @description
 * Payment-focused options showing payment verification statuses.
 * Passed to the generic `TableToolbar` component.
 */
export const PAYMENT_STATUS_OPTIONS: IStatusOption<PaymentStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: EnumPaymentStatus.Pending, label: "En attente" },
    { value: EnumPaymentStatus.Verified, label: "Vérifié" },
    { value: EnumPaymentStatus.Rejected, label: "Rejeté" }
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
    { value: EnumPaymentMethod.BankTransfer, label: "Virement" },
    { value: EnumPaymentMethod.MobileMoney, label: "Mobile Money" },
    { value: EnumPaymentMethod.Cash, label: "Espèces" }
];
