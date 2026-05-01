import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTechnicianDto {
  // User fields
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  extension!: string;

  @IsString()
  @IsNotEmpty()
  zone!: string;
}
