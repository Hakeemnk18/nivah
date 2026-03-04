import { injectable } from "tsyringe";
import { twilioClient } from "../../config/twilio.js";
import { INotificationService } from "../../core/ports/notification.service.interface.js";
@injectable()
export class WhatsAppNotificationService
    implements INotificationService {
    async sendBookingConfirmation(
        phoneNumber: string,
        message: string
    ): Promise<void> {
        try {
            let phone
            if (phoneNumber.startsWith("+91")) {
                phone = phoneNumber;
            } else {
                phone = `+91${phoneNumber}`;
            }
            const res = await twilioClient.messages.create({
                from: process.env.TWILIO_WHATSAPP_NUMBER!,
                to: `whatsapp:${phone}`,
                body: `${message}`,
            });

        } catch (error) {
            console.log("error in notification", error)
        }
    }
}