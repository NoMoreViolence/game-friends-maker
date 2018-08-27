import { Table, Column, Model, AllowNull, DataType, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'user' })
class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public username: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public password: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public salt: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default User;
