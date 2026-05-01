import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import { CommerceMapper } from "@/modules/commerce/infrastructure/mappers/commerce.mapper";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import type {
    EnumCoreContentType,
    EnumOrderStatus,
    EnumPaymentMethod
} from "@/shared/infrastructure/api/generated/116.api";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Commerce repository implementation using REST API.
 */
export class CommerceRepositoryImpl implements ICommerceRepositoryPort {
    async createOrder(data: {
        customerId: string;
        packageId?: string | null;
    }): Promise<Result<IOrderSummaryEntity>> {
        try {
            const response = await apiClient.api.adminCreateOrder(data);
            return ok(CommerceMapper.orderSummaryFromDto(response.data.order));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async addItemToOrder(
        orderId: string,
        data: {
            contentKind: EnumCoreContentType;
            categoryId: string;
            promotionLevelId?: string | null;
            socialBoost: boolean;
            isBonus: boolean;
        }
    ): Promise<Result<IOrderItemEntity>> {
        try {
            const response = await apiClient.api.adminAddOrderItem(orderId, data);
            return ok(CommerceMapper.orderItemFromDto(response.data.item));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async addTierToItem(
        orderId: string,
        itemId: string,
        data: { pricingTierId: string }
    ): Promise<Result<IItemTierEntity>> {
        try {
            const response = await apiClient.api.adminAddItemTier(orderId, itemId, data);
            return ok(CommerceMapper.itemTierFromDto(response.data.tier));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async submitOrder(id: string): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminSubmitOrder(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async cancelOrder(id: string): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminCancelOrder(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async attachPaymentProof(
        orderId: string,
        data: { file: File; paymentMethod: EnumPaymentMethod }
    ): Promise<Result<{ id: string; fileName: string; storageUrl: string }>> {
        try {
            const response = await apiClient.api.adminAttachPaymentProof(
                orderId,
                { paymentMethod: data.paymentMethod },
                { file: data.file }
            );
            const proof = response.data.proof;
            return ok({
                id: proof.id,
                fileName: proof.fileName,
                storageUrl: proof.storageUrl
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async verifyPayment(
        orderId: string,
        data: { receiptUrl: string }
    ): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminVerifyPayment(orderId, data);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async rejectPayment(
        orderId: string,
        data: { notes?: string | null }
    ): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminRejectPayment(orderId, data);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async listOrders(params: {
        pageIndex: number;
        pageSize: number;
        status?: EnumOrderStatus;
        customerId?: string;
        search?: string;
    }): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllOrders({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                status: params.status,
                customerId: params.customerId,
                ...(params.search ? { search: params.search } : {})
            } as Parameters<typeof apiClient.api.adminGetAllOrders>[0]);
            const paginated = response.data.orders;
            return ok({
                items: paginated.items.map(CommerceMapper.orderSummaryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getOrderById(id: string): Promise<Result<IOrderDetailEntity>> {
        try {
            const response = await apiClient.api.adminGetOrderById(id);
            return ok(CommerceMapper.orderDetailFromDto(response.data.order));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getOrderPayment(orderId: string): Promise<Result<IPaymentEntity>> {
        try {
            const response = await apiClient.api.adminGetOrderPayment(orderId);
            return ok(CommerceMapper.paymentFromDto(response.data.payment));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async listPendingPaymentOrders(params: {
        pageIndex: number;
        pageSize: number;
    }): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetPendingPaymentOrders({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize
            });
            const paginated = response.data.orders;
            return ok({
                items: paginated.items.map(CommerceMapper.orderSummaryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getCustomerOrders(
        customerId: string,
        params: { pageIndex: number; pageSize: number }
    ): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetCustomerOrders(customerId, {
                pageIndex: params.pageIndex,
                pageSize: params.pageSize
            });
            const paginated = response.data.orders;
            return ok({
                items: paginated.items.map(CommerceMapper.orderSummaryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
