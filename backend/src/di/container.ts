import { registerCommonDependencies } from "./common.container.js";
import { registerUserDependencies } from "./user.container.js";


registerCommonDependencies()
registerUserDependencies();


export { container } from "tsyringe";