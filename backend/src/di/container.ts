import { registerCategoryDependencies } from "./category.container.js";
import { registerCommonDependencies } from "./common.container.js";
import { registerProductDependencies } from "./product.container.js";
import { registerUserDependencies } from "./user.container.js";
import { registerCartDependencies } from "./cart.container.js";
import { registerOrderDependencies } from "./order.container.js";
import { registerPaymentDependencies } from "./payment.container.js";
import { registerAnalysisDependencies } from "./analysis.container.js";
import { registerReportDependencies } from "./report.container.js";
import { registerHeroDependencies } from "./hero.container.js";
import { registerBannerDependencies } from "./banner.container.js";
import { registerTestimonialDependencies } from "./testimonial.container.js";
import { registerCampaignDependencies } from "./campaign.container.js";

registerCommonDependencies()
registerUserDependencies();
registerCategoryDependencies()
registerProductDependencies()
registerCartDependencies()
registerOrderDependencies()
registerPaymentDependencies()
registerAnalysisDependencies()
registerReportDependencies()
registerHeroDependencies()
registerBannerDependencies()
registerTestimonialDependencies()
registerCampaignDependencies()


export { container } from "tsyringe";