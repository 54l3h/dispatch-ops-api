import { IsUUID, IsNotEmpty } from 'class-validator';

export class AssignPlanDto {
  @IsUUID()
  @IsNotEmpty()
  companyId!: string;

  @IsUUID()
  @IsNotEmpty()
  planId!: string;
}
