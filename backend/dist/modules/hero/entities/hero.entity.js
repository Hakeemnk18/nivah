export class Hero {
    id;
    title;
    subtitle;
    image;
    isActive;
    constructor(props) {
        const title = props.title.trim();
        const subtitle = props.subtitle.trim();
        if (!title) {
            throw new Error("Hero title cannot be empty");
        }
        if (title.length < 2 || title.length > 100) {
            throw new Error("Hero title must be between 2 and 100 characters");
        }
        if (!subtitle) {
            throw new Error("Hero subtitle cannot be empty");
        }
        if (subtitle.length < 5 || subtitle.length > 200) {
            throw new Error("Hero subtitle must be between 5 and 200 characters");
        }
        if (!props.image || !props.image.url || !props.image.publicId) {
            throw new Error("Hero image with url and publicId is required");
        }
        this.id = props.id ?? null;
        this.title = title;
        this.subtitle = subtitle;
        this.image = props.image;
        this.isActive = props.isActive ?? true;
    }
    activate() {
        if (this.isActive) {
            throw new Error("Hero is already active");
        }
        return new Hero({
            ...this,
            isActive: true,
        });
    }
    deactivate() {
        if (!this.isActive) {
            throw new Error("Hero is already inactive");
        }
        return new Hero({
            ...this,
            isActive: false,
        });
    }
    updateDetails(props) {
        return new Hero({
            ...this,
            title: props.title,
            subtitle: props.subtitle,
            image: props.image,
        });
    }
}
//# sourceMappingURL=hero.entity.js.map