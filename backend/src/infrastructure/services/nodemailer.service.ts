import type { IEmailService } from "../../core/ports/email.service.interface.js";
import { injectable } from "tsyringe";
import { Resend } from "resend";
import type { EmailData } from "../../core/shared/types/email.type.js";

@injectable()
export class NodemailerService implements IEmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendOrderStatusUpdate(data: EmailData): Promise<void> {
    console.log("email function called data", data);
    const { to, orderNumber, status, customerName, title } = data;
    const subject = `Order Status Update: ${orderNumber}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <h1 style="text-align:center; color:#b8892e; margin-bottom:10px;">
            NIVAH Fashion Hub
          </h1>
          <h2 style="text-align:center; color:#333;">
            ${title}
          </h2>
          <p style="font-size:16px;">Hi <strong>${customerName}</strong>,</p>
          <p style="font-size:15px; color:#555;">
            Your order <strong>#${orderNumber}</strong> has been updated.
          </p>
          <div style="margin:20px 0; padding:15px; background:#f8f9fb; border-radius:6px;">
            <p style="margin:0; font-size:15px;">
              <strong>Order Number:</strong> #${orderNumber}
            </p>
            <p style="margin-top:10px; font-size:15px;">
              <strong>Status:</strong> 
              <span style="background:#2e4d7a; color:#ffffff; padding:6px 12px; border-radius:4px; font-size:14px; margin-left:5px;">
                ${status.toUpperCase()}
              </span>
            </p>
          </div>
          <p style="font-size:15px; color:#555;">
            Thank you for shopping with <strong>NIVAH Fashion Hub</strong>.
          </p>
          <hr style="margin:30px 0; border:none; border-top:1px solid #eee;">
          <p style="font-size:13px; color:#888; text-align:center;">
            © ${new Date().getFullYear()} NIVAH Fashion Hub  
            All rights reserved.
          </p>
        </div>
      </div>
    `;

    try {
      console.log("before sending mail via Resend");

      const { data: responseData, error } = await this.resend.emails.send({
        // ⚠️ CRITICAL FOR TESTING: You MUST use this exact 'from' address until you verify a custom domain
        from: "NIVAH <onboarding@resend.dev>",
        to: ["nivahfsn@gmail.com"],
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return;
      }

      console.log("after sending mail. Resend ID:", responseData?.id);
    } catch (error) {
      console.error("Failed to execute Resend:", error);
    }
  }
}