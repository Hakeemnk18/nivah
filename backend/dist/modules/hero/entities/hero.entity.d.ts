import type { IImage, HeroProps } from "../types/hero.type.js";
export declare class Hero {
    readonly id: string | null;
    readonly title: string;
    readonly subtitle: string;
    readonly image: IImage;
    readonly isActive: boolean;
    constructor(props: HeroProps);
    activate(): Hero;
    deactivate(): Hero;
    updateDetails(props: {
        title: string;
        subtitle: string;
        image: IImage;
    }): Hero;
}
//# sourceMappingURL=hero.entity.d.ts.map