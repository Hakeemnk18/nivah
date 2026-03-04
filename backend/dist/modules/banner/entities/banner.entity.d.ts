import type { IImage, BannerProps } from "../types/banner.type.js";
export declare class Banner {
    readonly id: string | null;
    readonly image: IImage;
    readonly isActive: boolean;
    constructor(props: BannerProps);
    activate(): Banner;
    deactivate(): Banner;
    updateDetails(props: {
        image: IImage;
    }): Banner;
}
//# sourceMappingURL=banner.entity.d.ts.map