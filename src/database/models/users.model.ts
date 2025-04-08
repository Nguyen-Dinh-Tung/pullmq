import { Column, DataType } from 'sequelize-typescript';
import TableBuild, { BaseModel } from '../base.model';

@TableBuild({
  tableName: 'users',
})
export class UsersModel extends BaseModel {
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  roles: string;
}
export default UsersModel;
