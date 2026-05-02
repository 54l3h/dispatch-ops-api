import { IsNotEmpty, IsUUID } from "class-validator";

export class AssignLeadDto {
  @IsUUID()
  @IsNotEmpty()
  technicianProfileId!: string;
}