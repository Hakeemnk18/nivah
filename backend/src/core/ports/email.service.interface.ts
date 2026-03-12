export interface IEmailService {
  sendOrderStatusUpdate(
    to: string,
    orderNumber: string,
    status: string,
    customerName: string
  ): Promise<void>;
}