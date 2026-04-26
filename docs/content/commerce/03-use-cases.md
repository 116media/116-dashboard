# Phase 3: Use Cases

One use case file per endpoint. All implement `IResultUseCase<TReq, TRes>`.

**Path:** `src/modules/commerce/application/usecases/`

---

## Order Mutations (5 use cases)

| File | Input | Output |
| --- | --- | --- |
| `createorder.usecase.ts` | `ICreateOrderCredentials` | `IOrderDetailEntity` |
| `additemtoorder.usecase.ts` | `{ orderId: string; data: IAddOrderItemCredentials }` | `IOrderItemEntity` |
| `addtiertoitem.usecase.ts` | `{ orderId: string; itemId: string; data: IAddItemTierCredentials }` | `IItemTierEntity` |
| `submitorder.usecase.ts` | `string` (orderId) | `IOrderDetailEntity` |
| `cancelorder.usecase.ts` | `string` (orderId) | `IOrderDetailEntity` |

## Payment Mutations (3 use cases)

| File | Input | Output |
| --- | --- | --- |
| `attachpaymentproof.usecase.ts` | `{ orderId: string; data: IAttachPaymentProofCredentials }` | `IPaymentEntity` |
| `verifypayment.usecase.ts` | `string` (orderId) | `IPaymentEntity` |
| `rejectpayment.usecase.ts` | `string` (orderId) | `IPaymentEntity` |

## Order Queries (5 use cases)

| File | Input | Output |
| --- | --- | --- |
| `listorders.usecase.ts` | `IListOrdersParams` | `IPaginatedResult<IOrderSummaryEntity>` |
| `getorderbyid.usecase.ts` | `string` (orderId) | `IOrderDetailEntity` |
| `getorderpayment.usecase.ts` | `string` (orderId) | `IPaymentEntity` |
| `listpendingpaymentorders.usecase.ts` | `IListOrdersParams` | `IPaginatedResult<IOrderSummaryEntity>` |
| `getcustomerorders.usecase.ts` | `{ customerId: string; params: IListOrdersParams }` | `IPaginatedResult<IOrderSummaryEntity>` |

---

## Pattern

Each use case follows the same structure:

```ts
export class CreateOrderUseCase implements IResultUseCase<ICreateOrderCredentials, IOrderDetailEntity> {
    private readonly commerceRepository: ICommerceRepositoryPort;

    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }

    async execute(data: ICreateOrderCredentials): Promise<Result<IOrderDetailEntity>> {
        return this.commerceRepository.createOrder(data);
    }
}
```

Use cases with compound input (e.g., `orderId` + body) destructure the single argument:

```ts
export class AddItemToOrderUseCase implements IResultUseCase<{ orderId: string; data: IAddOrderItemCredentials }, IOrderItemEntity> {
    async execute({ orderId, data }: { orderId: string; data: IAddOrderItemCredentials }): Promise<Result<IOrderItemEntity>> {
        return this.commerceRepository.addItemToOrder(orderId, data);
    }
}
```

---

## TODO

- [ ] Create all 13 use case files with JSDoc
