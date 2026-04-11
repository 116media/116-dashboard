import { type AwilixContainer, asClass } from "awilix";
import { AddItemToOrderUseCase } from "@/modules/commerce/application/usecases/additemtoorder.usecase";
import { AddTierToItemUseCase } from "@/modules/commerce/application/usecases/addtiertoitem.usecase";
import { AttachPaymentProofUseCase } from "@/modules/commerce/application/usecases/attachpaymentproof.usecase";
import { CancelOrderUseCase } from "@/modules/commerce/application/usecases/cancelorder.usecase";
import { CreateOrderUseCase } from "@/modules/commerce/application/usecases/createorder.usecase";
import { GetCustomerOrdersUseCase } from "@/modules/commerce/application/usecases/getcustomerorders.usecase";
import { GetOrderByIdUseCase } from "@/modules/commerce/application/usecases/getorderbyid.usecase";
import { GetOrderPaymentUseCase } from "@/modules/commerce/application/usecases/getorderpayment.usecase";
import { ListOrdersUseCase } from "@/modules/commerce/application/usecases/listorders.usecase";
import { ListPendingPaymentOrdersUseCase } from "@/modules/commerce/application/usecases/listpendingpaymentorders.usecase";
import { RejectPaymentUseCase } from "@/modules/commerce/application/usecases/rejectpayment.usecase";
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

        // Payment mutations
        attachPaymentProofUseCase: asClass(AttachPaymentProofUseCase).transient(),
        verifyPaymentUseCase: asClass(VerifyPaymentUseCase).transient(),
        rejectPaymentUseCase: asClass(RejectPaymentUseCase).transient(),

        // Queries
        listOrdersUseCase: asClass(ListOrdersUseCase).transient(),
        getOrderByIdUseCase: asClass(GetOrderByIdUseCase).transient(),
        getOrderPaymentUseCase: asClass(GetOrderPaymentUseCase).transient(),
        listPendingPaymentOrdersUseCase: asClass(ListPendingPaymentOrdersUseCase).transient(),
        getCustomerOrdersUseCase: asClass(GetCustomerOrdersUseCase).transient()
    });
}
