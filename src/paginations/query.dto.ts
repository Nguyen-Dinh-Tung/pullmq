import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderEnum } from 'src/enums/query.enum';
import { PageRequest } from './pagination.dto';

export class QueryDto extends PageRequest {
  @IsOptional()
  @IsEnum(OrderEnum)
  order: OrderEnum = OrderEnum.DESC;
}

export class QueryCrudDateDto extends QueryDto {
  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}

export class QueryDate extends QueryDto {
  @IsOptional()
  @Transform((data) => new Date(data.value))
  startDate: Date;

  @IsOptional()
  @Transform((data) => new Date(data.value))
  endDate: Date;
}

export class QueryFullDate extends QueryCrudDateDto {
  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}
