import { PaymentStatus } from "@/shared/domain/enums/payment-status.enum";
import { EnumPaymentStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new status that isn't handled.
 */
const paymentStatusMap: Record<EnumPaymentStatus, PaymentStatus> = {
    [EnumPaymentStatus.Pending]: PaymentStatus.Pending,
    [EnumPaymentStatus.Verified]: PaymentStatus.Verified,
    [EnumPaymentStatus.Rejected]: PaymentStatus.Rejected
};

/**
 * Maps a generated API payment status to the domain PaymentStatus enum.
 *
 * @param {EnumPaymentStatus} status - API payment status value
 * @returns {PaymentStatus} Corresponding domain enum value
 */
export const mapPaymentStatus = (status: EnumPaymentStatus): PaymentStatus =>
    paymentStatusMap[status];
