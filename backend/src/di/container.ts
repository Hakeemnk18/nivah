import { registerCategoryDependencies } from "./category.container.js";
import { registerCommonDependencies } from "./common.container.js";
import { registerUserDependencies } from "./user.container.js";


registerCommonDependencies()
registerUserDependencies();
registerCategoryDependencies()


export { container } from "tsyringe";