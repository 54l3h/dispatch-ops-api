import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  priceMonthly!: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceYearly?: number;

  @IsNumber()
  @Min(1)
  maxTechnicians!: number;

  @IsNumber()
  @Min(1)
  maxDispatchers!: number;

  @IsBoolean()
  @IsOptional()
  hasCallRecording?: boolean;

  @IsBoolean()
  @IsOptional()
  hasLiveTracking?: boolean;

  @IsBoolean()
  @IsOptional()
  hasPayments?: boolean;

  @IsBoolean()
  @IsOptional()
  hasApiAccess?: boolean;
}