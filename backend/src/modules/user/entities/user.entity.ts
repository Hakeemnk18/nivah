export interface UserProps {
  id?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  role: "user" | "admin";
  password?: string | null;
  googleId?: string | null;
  isBlocked?: boolean;
  isGuest: boolean;
  isVerified?: boolean;
  tokenVersion: number;
}

export class User {
  public readonly id: string | null;
  public readonly name: string;
  public readonly email: string;
  public readonly phone: string | null;
  public readonly role: "admin" | "user";
  public readonly isGuest: boolean;
  public readonly password: string | null;
  public readonly googleId: string | null;
  public readonly isVerified: boolean;
  public readonly isBlocked: boolean;
  public readonly tokenVersion: number;

  constructor(props: UserProps) {
    this.id = props?.id ?? null;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone ?? null;
    this.role = props.role;
    this.password = props.password ?? null;
    this.isGuest = props.isGuest;
    this.googleId = props.googleId ?? null;
    this.isVerified = props.isVerified ?? false;
    this.isBlocked = props.isBlocked ?? false;
    this.tokenVersion = props.tokenVersion;
  }



  block(): User {
    return new User({ ...this, isBlocked: true });
  }

  unblock(): User {
    return new User({ ...this, isBlocked: false });
  }

  incrementTokenVersion(): User {
    return new User({
      ...this,
      tokenVersion: this.tokenVersion + 1,
    });
  }

  verify(): User {
    if (this.isVerified) {
      throw new Error("User already verified");
    }

    return new User({
      ...this,
      isVerified: true,
    });
  }

  setGoogleId(googleId: string): User {
    return new User({
      ...this,
      googleId,
      isVerified: true,
    });
  }

  changePassword(newHashedPassword: string): User {
    return new User({
      ...this,
      password: newHashedPassword,
    });
  }
}
