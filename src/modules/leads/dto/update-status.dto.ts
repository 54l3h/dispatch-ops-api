import { IsEnum, IsNotEmpty } from 'class-validator';
import { LeadStatus } from '@prisma/client';
 
export class UpdateLeadStatusDto {
  @IsEnum(LeadStatus)
  @IsNotEmpty()
  status!: LeadStatus;
}