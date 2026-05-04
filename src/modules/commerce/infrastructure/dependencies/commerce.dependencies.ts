import { type AwilixContainer, asClass } from "awilix";
import { AddItemToOrderUseCase } from "@/modules/commerce/application/usecases/additemtoorder.usecase";
import { AddTierToItemUseCase } from "@/modules/commerce/application/usecases/addtiertoitem.usecase";
import { AttachPaymentProofUseCase } from "@/modules/commerce/application/usecases/attachpaymentproof.usecase";
import { CancelOrderUseCase } from "@/modules/commerce/application/usecases/cancelorder.usecase";
import { CreateOrderUseCase } from "@/modules/commerce/application/usecases/createorder.usecase";
import { EditItemUseCase } from "@/modules/commerce/application/usecases/edititem.usecase";
import { EditOrderUseCase } from "@/modules/commerce/application/usecases/editorder.usecase";
import { GetCustomerOrdersUseCase } from "@/modules/commerce/application/usecases/getcustomerorders.usecase";
import { GetOrderByIdUseCase } from "@/modules/commerce/application/usecases/getorderbyid.usecase";
import { GetOrderPaymentUseCase } from "@/modules/commerce/application/usecases/getorderpayment.usecase";
import { ListOrdersUseCase } from "@/modules/commerce/application/usecases/listorders.usecase";
import { ListPaymentsUseCase } from "@/modules/commerce/application/usecases/listpayments.usecase";
import { ListPendingPaymentOrdersUseCase } from "@/modules/commerce/application/usecases/listpendingpaymentorders.usecase";
import { RejectPaymentUseCase } from "@/modules/commerce/application/usecases/rejectpayment.usecase";
import { RemoveItemUseCase } from "@/modules/commerce/application/usecases/removeitem.usecase";
import { RemoveItemTierUseCase } from "@/modules/commerce/application/usecases/removeitemtier.usecase";
import { SubmitOrderUseCase } from "@/modules/commerce/application/usecases/submitorder.usecase";
import { VerifyPaymentUseCase } from "@/modules/commerce/application/usecases/verifypayment.usecase";
import { CommerceRepositoryImpl } from "@/modules/commerce/infrastructure/repositories/commerce.repository.impl";

/**
 * Registers all commerce module dependencies with the Awilix DI container.
 *
 * @param {AwilixContainer} container - The Awilix container instance
 */
export function registerCommerceDependencies(container: AwilixContainer): void {
    container.register({
        commerceRepository: asClass(CommerceRepositoryImpl).singleton(),

        // Order mutations
        createOrderUseCase: asClass(CreateOrderUseCase).transient(),
        addItemToOrderUseCase: asClass(AddItemToOrderUseCase).transient(),
        addTierToItemUseCase: asClass(AddTierToItemUseCase).transient(),
        submitOrderUseCase: asClass(SubmitOrderUseCase).transient(),
        cancelOrderUseCase: asClass(CancelOrderUseCase).transient(),
        editOrderUseCase: asClass(EditOrderUseCase).transient(),
        removeItemUseCase: asClass(RemoveItemUseCase).transient(),
        removeItemTierUseCase: asClass(RemoveItemTierUseCase).transient(),
        editItemUseCase: asClass(EditItemUseCase).transient(),

        // Payment mutations
        attachPaymentProofUseCase: asClass(AttachPaymentProofUseCase).transient(),
        verifyPaymentUseCase: asClass(VerifyPaymentUseCase).transient(),
        rejectPaymentUseCase: asClass(RejectPaymentUseCase).transient(),

        // Queries
        listOrdersUseCase: asClass(ListOrdersUseCase).transient(),
        getOrderByIdUseCase: asClass(GetOrderByIdUseCase).transient(),
        getOrderPaymentUseCase: asClass(GetOrderPaymentUseCase).transient(),
        listPendingPaymentOrdersUseCase: asClass(ListPendingPaymentOrdersUseCase).transient(),
        getCustomerOrdersUseCase: asClass(GetCustomerOrdersUseCase).transient(),
        listPaymentsUseCase: asClass(ListPaymentsUseCase).transient()
    });
}
