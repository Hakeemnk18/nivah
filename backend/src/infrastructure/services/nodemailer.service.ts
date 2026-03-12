import type { IEmailService } from "../../core/ports/email.service.interface.js";
import { injectable } from "tsyringe";
import { transporter } from "../../config/nodemailer.js"; // Adjust path if needed

@injectable()
export class NodemailerService implements IEmailService {


  async sendOrderStatusUpdate(
    to: string,
    orderNumber: string,
    status: string,
    customerName: string
  ): Promise<void> {
    console.log("email service called")
    const subject = `Order Status Update: ${orderNumber}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hi ${customerName},</h2>
        <p>Your order <strong>#${orderNumber}</strong> has been updated.</p>
        <p>Current Status: <span style="font-weight: bold; color: #2e4d7a;">${status.toUpperCase()}</span></p>
        <p>Thank you for shopping with NIVAH!</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"NIVAH" <${process.env.SMTP_USER}>`, // Using SMTP_USER since you removed SMTP_FROM_EMAIL from .env
        to,
        subject,
        html: htmlContent,
      });
      console.log(`[Email Service] Status update sent to ${to} for order ${orderNumber}`);
    } catch (error) {
      console.error(`[Email Service] Failed to send email to ${to}:`, error);
    }
  }
}