import { container } from "tsyringe";
import { CreateHeroUseCase } from "../modules/hero/use-cases/create.hero.use-case.js";
import { EditHeroUseCase } from "../modules/hero/use-cases/edit.hero.use-case.js";
import { BlockHeroUseCase } from "../modules/hero/use-cases/block.hero.use-case.js";
import { UnblockHeroUseCase } from "../modules/hero/use-cases/unblock.hero.use-case.js";
import { GetHeroUserUseCase } from "../modules/hero/use-cases/get.hero.user.use-case.js";
import { GetHeroAdminUseCase } from "../modules/hero/use-cases/get.hero.admin.use-case.js";
import { HeroRepository } from "../modules/hero/repositories/hero.repository.js";
import { GetHeroByIdUseCase } from "../modules/hero/use-cases/get.hero.by.id.use-case.js";
export const registerHeroDependencies = () => {
    container.register("IHeroRepository", {
        useClass: HeroRepository,
    });
    container.register("ICreateHeroUseCase", {
        useClass: CreateHeroUseCase,
    });
    container.register("IEditHeroUseCase", {
        useClass: EditHeroUseCase,
    });
    container.register("IBlockHeroUseCase", {
        useClass: BlockHeroUseCase,
    });
    container.register("IUnblockHeroUseCase", {
        useClass: UnblockHeroUseCase,
    });
    container.register("IGetHeroUserUseCase", {
        useClass: GetHeroUserUseCase,
    });
    container.register("IGetHeroAdminUseCase", {
        useClass: GetHeroAdminUseCase,
    });
    container.register("IGetHeroByIdUseCase", {
        useClass: GetHeroByIdUseCase,
    });
};
//# sourceMappingURL=hero.container.js.map