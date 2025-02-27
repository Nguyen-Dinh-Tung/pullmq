import { Injectable } from '@nestjs/common';
import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import { Col, Fn, Literal } from 'sequelize/types/utils';

@Injectable()
export abstract class BaseRepository<T extends Model> {
  constructor(private readonly model: ModelCtor<T>) {}

  async create(data: Partial<T>): Promise<void> {
    await this.model.create(data as any);
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findOne(options?: FindOptions<T>): Promise<T | null> {
    return await this.model.findOne(options);
  }

  async update(
    values: {
      [key in keyof T]?: Fn | Col | Literal | T[key];
    },
    options: UpdateOptions<T>,
  ): Promise<boolean> {
    const [rows] = await this.model.update(values, options);
    return rows > 0;
  }

  async delete(options: DestroyOptions<T>): Promise<boolean> {
    const rows = await this.model.destroy(options);
    return rows > 0;
  }

  async bulkCreate(data: Partial<T>[]): Promise<void> {
    await this.model.bulkCreate(data as any);
  }
}
