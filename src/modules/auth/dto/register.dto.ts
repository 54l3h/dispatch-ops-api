import { Roles } from 'src/common/enums/roles.enum';

export class RegisterDto {
  email!: string;
  name!: string;
  password!: string;
  role!: Roles;
}
