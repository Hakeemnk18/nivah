import type { EmailData } from "../shared/types/email.type.js";

export interface IEmailService {
  sendOrderStatusUpdate(
    data: EmailData
  ): Promise<void>;
}