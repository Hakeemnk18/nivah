import type { Request, Response } from "express";
import type { IHandleRazorpayWebhookUseCase } from "../use-cases/interfaces/handle.webhook.use-case.interface.js";
interface IHandleRazorpayWebHookController {
    handle(req: Request, res: Response): Promise<void>;
}
export declare class RazorpayWebhookController implements IHandleRazorpayWebHookController {
    private readonly _handleRazorpayWebhookUseCase;
    constructor(_handleRazorpayWebhookUseCase: IHandleRazorpayWebhookUseCase);
    handle(req: Request, res: Response): Promise<void>;
}
export {};
//# sourceMappingURL=webhook.controller.d.ts.map