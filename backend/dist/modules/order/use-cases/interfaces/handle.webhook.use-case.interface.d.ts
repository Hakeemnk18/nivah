import type { RazorpayWebhookEvent } from "../../types/order.type.js";
export interface IHandleRazorpayWebhookUseCase {
    execute(event: RazorpayWebhookEvent): Promise<void>;
}
//# sourceMappingURL=handle.webhook.use-case.interface.d.ts.map