import { inject } from "tsyringe";
import type { ICartController } from "./cart.controller.interface.js";
import type { ICreateCategoryUseCase } from "../../category/use-cases/interfaces/create.category.use-case.interface.js";


export class CartController implements ICartController {

    constructor(
        @inject("ICreateCartUseCase") private createCartUseCase: ICreateCategoryUseCase,
    ) {}

    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const dto = AddCa
        } catch (error) {
            
        }

}
  