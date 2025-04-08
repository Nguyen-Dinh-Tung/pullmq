import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageRequest {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(100)
  readonly limit?: number;

  public getSkip(): number {
    return ((this.page || 1) - 1) * (this.limit || 10);
  }
}

export class PageMeta {
  readonly page: number;
  readonly total: number;
  readonly limit: number;
  readonly totalPage: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor(page: number, total: number, limit: number) {
    this.page = page;
    this.total = total;
    this.limit = limit;
    this.totalPage = Math.ceil(this.total / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPage;
  }
}

interface IPaginated<T> {
  docs: T[];
  meta?: PageMeta;
}

export function Paginate<T>() {
  class Paginated implements IPaginated<T> {
    docs: T[];
    meta?: PageMeta;

    constructor(docs: T[], meta?: PageMeta) {
      this.docs = docs;
      this.meta = meta;
    }
  }
  return Paginated;
}

interface IDetailResponse<T> {
  data: T;
}

export class DetailResponse<T> implements IDetailResponse<T> {
  constructor(public data: T) {
    this.data = data;
  }
}
