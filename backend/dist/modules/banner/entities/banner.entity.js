export class Banner {
    id;
    image;
    isActive;
    constructor(props) {
        if (!props.image || !props.image.url || !props.image.publicId) {
            throw new Error("Banner image with url and publicId is required");
        }
        this.id = props.id ?? null;
        this.image = props.image;
        this.isActive = props.isActive ?? true;
    }
    activate() {
        if (this.isActive) {
            throw new Error("Banner is already active");
        }
        return new Banner({
            ...this,
            isActive: true,
        });
    }
    deactivate() {
        if (!this.isActive) {
            throw new Error("Banner is already inactive");
        }
        return new Banner({
            ...this,
            isActive: false,
        });
    }
    updateDetails(props) {
        return new Banner({
            ...this,
            image: props.image,
        });
    }
}
//# sourceMappingURL=banner.entity.js.map