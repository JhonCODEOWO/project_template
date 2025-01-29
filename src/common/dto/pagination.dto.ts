import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  offset: number;
  @IsNumber()
  @IsOptional()
  @Min(1)
  limit: number;
}
