import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LeadStatus } from '@prisma/client';
 
export class ListLeadsDto {
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;
 
  @IsString()
  @IsOptional()
  zone?: string;
}