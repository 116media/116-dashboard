import { PaymentMethod } from "@/shared/domain/enums/payment-method.enum";
import { EnumPaymentMethod } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new method that isn't handled.
 */
const paymentMethodMap: Record<EnumPaymentMethod, PaymentMethod> = {
    [EnumPaymentMethod.BankTransfer]: PaymentMethod.BankTransfer,
    [EnumPaymentMethod.MobileMoney]: PaymentMethod.MobileMoney,
    [EnumPaymentMethod.Cash]: PaymentMethod.Cash
};

/**
 * Maps a generated API payment method to the domain PaymentMethod enum.
 *
 * @param {EnumPaymentMethod} method - API payment method value
 * @returns {PaymentMethod} Corresponding domain enum value
 */
export const mapPaymentMethod = (method: EnumPaymentMethod): PaymentMethod =>
    paymentMethodMap[method];
