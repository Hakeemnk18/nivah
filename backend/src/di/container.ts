import { registerCategoryDependencies } from "./category.container.js";
import { registerCommonDependencies } from "./common.container.js";
import { registerProductDependencies } from "./product.container.js";
import { registerUserDependencies } from "./user.container.js";
import { registerCartDependencies } from "./cart.container.js";

registerCommonDependencies()
registerUserDependencies();
registerCategoryDependencies()
registerProductDependencies()
registerCartDependencies()


export { container } from "tsyringe";