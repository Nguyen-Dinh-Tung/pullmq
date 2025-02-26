import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  TableOptions,
  Model,
} from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
  })
  id: number;
}

export default function TableBuild(options: TableOptions<Model<any>>) {
  return Table({
    timestamps: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    omitNull: true,
    paranoid: true,
    ...options,
    initialAutoIncrement: 'AUTO_INCREMENT',
  });
}
