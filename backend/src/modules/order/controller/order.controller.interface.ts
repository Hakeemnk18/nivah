import type { Request, Response } from "express";

export interface IOrderController {
    createOrder(req: Request, res: Response): Promise<void>;
    verifyPayment(req: Request, res: Response): Promise<void>;
    getOrderStatus(req: Request, res: Response): Promise<void>;
    // getOrderById(req: Request, res: Response): Promise<void>;
    // getOrdersByGuestId(req: Request, res: Response): Promise<void>;
    // cancelOrder(req: Request, res: Response): Promise<void>;
}