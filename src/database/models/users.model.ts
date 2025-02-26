import { Column, DataType } from 'sequelize-typescript';
import TableBuild, { BaseModel } from '../base.model';

@TableBuild({
  tableName: 'users',
})
export class UsersModel extends BaseModel {
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
export default UsersModel;
