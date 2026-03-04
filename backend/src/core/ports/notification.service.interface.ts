export abstract class INotificationService {
    abstract sendBookingConfirmation(
        phoneNumber: string,
        message: string
    ): Promise<void>;
}