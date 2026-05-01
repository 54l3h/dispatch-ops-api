import { Roles } from "src/common/enums/roles.enum";

export class CreateUserDto {
  email!: string;
  name!: string;
  password!: string;
  tokenVersion!: number;
  role!: Roles;
}
