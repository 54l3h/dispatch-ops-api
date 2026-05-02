import { LeadSource } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @IsString()
  @IsNotEmpty()
  zone!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsUUID()
  @IsNotEmpty()
  serviceId!: string;

  @IsEnum(LeadSource)
  @IsOptional()
  source?: LeadSource;

  @IsNumber()
  @IsOptional()
  estimatedValue?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  // optional - if customer is registered
  @IsUUID()
  @IsOptional()
  customerProfileId?: string;
}