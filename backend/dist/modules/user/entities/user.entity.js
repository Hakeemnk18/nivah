export class User {
    id;
    name;
    email;
    phone;
    role;
    password;
    googleId;
    isVerified;
    isBlocked;
    tokenVersion;
    constructor(props) {
        this.id = props?.id ?? null;
        this.name = props.name;
        this.email = props.email;
        this.phone = props.phone ?? null;
        this.role = props.role;
        this.password = props.password ?? null;
        this.googleId = props.googleId ?? null;
        this.isVerified = props.isVerified ?? false;
        this.isBlocked = props.isBlocked ?? false;
        this.tokenVersion = props.tokenVersion;
    }
    block() {
        return new User({ ...this, isBlocked: true });
    }
    unblock() {
        return new User({ ...this, isBlocked: false });
    }
    incrementTokenVersion() {
        return new User({
            ...this,
            tokenVersion: this.tokenVersion + 1,
        });
    }
    verify() {
        if (this.isVerified) {
            throw new Error("User already verified");
        }
        return new User({
            ...this,
            isVerified: true,
        });
    }
    setGoogleId(googleId) {
        return new User({
            ...this,
            googleId,
            isVerified: true,
        });
    }
    changePassword(newHashedPassword) {
        return new User({
            ...this,
            password: newHashedPassword,
        });
    }
}
//# sourceMappingURL=user.entity.js.map