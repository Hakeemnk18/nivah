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
        console.log("webhook controller called new", req.body)
        const signature = req.headers["x-razorpay-signature"] as string;
        const requestWithRawBody = req as Request & { rawBody: Buffer };
        if (!requestWithRawBody.rawBody) {
            console.error("Raw body is missing from the request.");
            res.status(400).send("Webhook error: Raw body missing");
            return;
        }
        console.log("raw body ", requestWithRawBody.rawBody)
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(requestWithRawBody.rawBody)
            .digest("hex");

        if (signature !== expected) {
            res.status(400).send("Invalid signature");
            return;
        }

        const event = req.body;
        console.log("Verified event:", event);
        console.log("event", event)
        try {
            await this._handleRazorpayWebhookUseCase.execute(event);
            res.status(200).json({ received: true });
        } catch (error) {
            res.status(200).json({ received: true });
        }
    }
}