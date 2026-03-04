var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from "tsyringe";
import { twilioClient } from "../../config/twilio.js";
import { INotificationService } from "../../core/ports/notification.service.interface.js";
let WhatsAppNotificationService = class WhatsAppNotificationService {
    async sendBookingConfirmation(phoneNumber, message) {
        try {
            let phone;
            if (phoneNumber.startsWith("+91")) {
                phone = phoneNumber;
            }
            else {
                phone = `+91${phoneNumber}`;
            }
            const res = await twilioClient.messages.create({
                from: process.env.TWILIO_WHATSAPP_NUMBER,
                to: `whatsapp:${phone}`,
                body: `${message}`,
            });
        }
        catch (error) {
            console.log("error in notification", error);
        }
    }
};
WhatsAppNotificationService = __decorate([
    injectable()
], WhatsAppNotificationService);
export { WhatsAppNotificationService };
//# sourceMappingURL=notification.service.js.map