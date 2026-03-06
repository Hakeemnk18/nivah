import { inject, injectable } from "tsyringe";
import type { Request, Response } from "express";
import crypto from "crypto";
import type { IHandleRazorpayWebhookUseCase } from "../use-cases/interfaces/handle.webhook.use-case.interface.js";


interface IHandleRazorpayWebHookController {
    handle(req: Request, res: Response): Promise<void>;
}

@injectable()
export class RazorpayWebhookController implements IHandleRazorpayWebHookController {

    constructor(
        @inject("IHandleRazorpayWebhookUseCase")
        private readonly _handleRazorpayWebhookUseCase: IHandleRazorpayWebhookUseCase
    ) { }

    async handle(req: Request, res: Response): Promise<void> {
        console.log("webhook controller called")
        const signature = req.headers["x-razorpay-signature"] as string;
        const requestWithRawBody = req as Request & { rawBody: Buffer };
        console.log(requestWithRawBody.rawBody)
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(requestWithRawBody.rawBody)
            .digest("hex");

        if (signature !== expected) {
            res.status(400).send("Invalid signature");
            return;
        }

        const event = JSON.parse(req.body.toString());
        console.log("event", event)
        try {
            await this._handleRazorpayWebhookUseCase.execute(event);
            res.status(200).json({ received: true });
        } catch (error) {
            res.status(200).json({ received: true });
        }
    }
}