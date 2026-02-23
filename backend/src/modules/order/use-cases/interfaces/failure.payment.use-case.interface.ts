import type { HandlePaymentFailureRequestDto } from "../../types/order.type.js";

export interface IHandlePaymentFailureUseCase {
    execute(dto: HandlePaymentFailureRequestDto): Promise<void>;
}