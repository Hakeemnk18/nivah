import { container } from "tsyringe";
import { CreateOrderUseCase } from "../modules/order/use-cases/create.order.use-case.js";
import { OrderRepository } from "../modules/order/repositories/order.repository.js";
import { VerifyPaymentUseCase } from "../modules/order/use-cases/verify.payment.use-case.js";
import { HandleRazorpayWebhookUseCase } from "../modules/order/use-cases/handle.webhook.usecase.js";
import { GetOrderStatusUseCase } from "../modules/order/use-cases/get.order.status.use-case.js";
import { AutoCancelOrderUseCase } from "../modules/order/use-cases/auto-cancel-order.use-case.js";
import { HandlePaymentFailureUseCase } from "../modules/order/use-cases/failure.payment.use-case.js";
import { GetOrderSummaryUseCase } from "../modules/order/use-cases/get.order.summery.use-case.js";
import { DownloadInvoiceUseCase } from "../modules/order/use-cases/download.invoice.use-case.js";
import { GetAdminOrdersUseCase } from "../modules/order/use-cases/get.admin.orders.use-case.js";
import { DispatchOrderUseCase } from "../modules/order/use-cases/dispatch.order.use-case.js";
import { DeliverOrderUseCase } from "../modules/order/use-cases/deliver.order.use-case.js";
import { AcceptOrderUseCase } from "../modules/order/use-cases/accept.order.use-case.js";
import { CancelOrderUseCase } from "../modules/order/use-cases/cancel.order.use-case.js";
import { GetAdminFullViewUseCase } from "../modules/order/use-cases/get.admin.full.view.use-case.js";
import { AdminDownloadInvoiceUseCase } from "../modules/order/use-cases/admin.dowload.invoice.use-case.js";
export const registerOrderDependencies = () => {
    container.register("IOrderRepository", {
        useClass: OrderRepository,
    });
    container.register("ICreateOrderUseCase", {
        useClass: CreateOrderUseCase,
    });
    container.register("IVerifyPaymentUseCase", {
        useClass: VerifyPaymentUseCase,
    });
    container.register("IHandleRazorpayWebhookUseCase", {
        useClass: HandleRazorpayWebhookUseCase,
    });
    container.register("IGetOrderStatusUseCase", {
        useClass: GetOrderStatusUseCase,
    });
    container.register("IAutoCancelOrderUseCase", {
        useClass: AutoCancelOrderUseCase,
    });
    container.register("IHandlePaymentFailureUseCase", {
        useClass: HandlePaymentFailureUseCase,
    });
    container.register("IGetOrderSummaryUseCase", {
        useClass: GetOrderSummaryUseCase,
    });
    container.register("IDownloadInvoiceUseCase", {
        useClass: DownloadInvoiceUseCase,
    });
    container.register("IGetAdminOrdersUseCase", {
        useClass: GetAdminOrdersUseCase,
    });
    container.register("IDispatchOrderUseCase", {
        useClass: DispatchOrderUseCase,
    });
    container.register("IDeliverOrderUseCase", {
        useClass: DeliverOrderUseCase,
    });
    container.register("IAcceptOrderUseCase", {
        useClass: AcceptOrderUseCase,
    });
    container.register("ICancelOrderUseCase", {
        useClass: CancelOrderUseCase,
    });
    container.register("IGetAdminFullViewUseCase", {
        useClass: GetAdminFullViewUseCase,
    });
    container.register("IAdminDownloadInvoiceUseCase", {
        useClass: AdminDownloadInvoiceUseCase,
    });
};
//# sourceMappingURL=order.container.js.map