import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
 
export class RegisterCompanyDto {
  // personal account
  @IsString()
  @IsNotEmpty()
  name!: string;
 
  @IsEmail()
  @IsNotEmpty()
  email!: string;
 
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
 
  @IsString()
  @IsOptional()
  phone?: string;
 
  // company
  @IsString()
  @IsNotEmpty()
  companyName!: string;
 
  @IsEmail()
  @IsNotEmpty()
  companyEmail!: string;
 
  @IsString()
  @IsOptional()
  companyPhone?: string;
 
  @IsString()
  @IsOptional()
  companyAddress?: string;
}