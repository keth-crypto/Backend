import { IsInt, IsNumber, IsString, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class MotorPartDto {
  @IsString()
  @IsNotEmpty()
  motorPart!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  brand_id!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  supplier_id!: number;
}