import { Expose } from "class-transformer";

export class AuthResponse {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  constructor(partial: Partial<AuthResponse>) {
    Object.assign(this, partial);
  }
}
