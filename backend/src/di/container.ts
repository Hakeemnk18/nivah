import { registerCategoryDependencies } from "./category.container.js";
import { registerCommonDependencies } from "./common.container.js";
import { registerProductDependencies } from "./product.container.js";
import { registerUserDependencies } from "./user.container.js";


registerCommonDependencies()
registerUserDependencies();
registerCategoryDependencies()
registerProductDependencies()


export { container } from "tsyringe";