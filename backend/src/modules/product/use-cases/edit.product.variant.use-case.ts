import { inject, injectable } from "tsyringe";
import type { IEditProductVariantUseCase } from "./interfaces/edit.product.variant.use-case.interface.js";
import type { IProductRepository } from "../repositories/product.repository.interface.js";
import type { AddVariantRequestDto } from "../dtos/variant.dto.js";
import { CustomError } from "../../../core/errors/custom.error.js";
import { ResponseMessages } from "../../../core/constants/response.message.js";
import { HttpStatusCode } from "../../../core/constants/http.status.codes.js";
import { assertUniqueVariantSizes } from "../utils/variant.validate.helper.js";

@injectable()
export class EditProductVariantUseCase
  implements IEditProductVariantUseCase
{
  constructor(
    @inject("IProductRepository")
    private readonly _productRepository: IProductRepository
  ) {}

  async execute(
    productId: string,
    variantId: string,
    dto: AddVariantRequestDto
  ): Promise<void> {
    const product = await this._productRepository.findById(productId);

    if (!product) {
      throw new CustomError(
        ResponseMessages.PRODUCT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const variant = product.variants.find(
      (v) => v?.id!.toString() === variantId
    );

    if (!variant) {
      throw new CustomError(
        ResponseMessages.VARIANT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    // 🔒 Business invariant:
    // Allow same size for this variant, but not duplicates
    
    const combinedVariants = product.variants.map((v) => ({
      size: v.id!.toString() === variantId ? dto.size : v.size,
      stock: v.stock,
      price: v.price,
    }));
    

    
    const isValid = assertUniqueVariantSizes(combinedVariants);
    
    if(!isValid){
      throw new CustomError(
        ResponseMessages.PRODUCT_DUPLICATE_VARIANT_SIZE,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const updated = await this._productRepository.updateVariantById({
      productId,
      variantId,
      data: {
        size: dto.size,
        stock: dto.stock,
        price: dto.price,
        isAvailable: dto.stock > 0,
      },
    });

    if (!updated) {
      throw new CustomError(
        ResponseMessages.PRODUCT_UPDATE_FAILED,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
