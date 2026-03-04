var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import crypto from "crypto";
let RazorpayWebhookController = class RazorpayWebhookController {
    _handleRazorpayWebhookUseCase;
    constructor(_handleRazorpayWebhookUseCase) {
        this._handleRazorpayWebhookUseCase = _handleRazorpayWebhookUseCase;
    }
    async handle(req, res) {
        console.log("webhook controller called");
        const signature = req.headers["x-razorpay-signature"];
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(req.body)
            .digest("hex");
        if (signature !== expected) {
            res.status(400).send("Invalid signature");
            return;
        }
        const event = JSON.parse(req.body.toString());
        try {
            await this._handleRazorpayWebhookUseCase.execute(event);
            res.status(200).json({ received: true });
        }
        catch (error) {
            res.status(200).json({ received: true });
        }
    }
};
RazorpayWebhookController = __decorate([
    injectable(),
    __param(0, inject("IHandleRazorpayWebhookUseCase")),
    __metadata("design:paramtypes", [Object])
], RazorpayWebhookController);
export { RazorpayWebhookController };
//# sourceMappingURL=webhook.controller.js.map