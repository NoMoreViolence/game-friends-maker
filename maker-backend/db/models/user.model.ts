import {
  Table,
  Model,
  DataType,
  Column,
  Default,
  Unique,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';

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
  @Column(DataType.STRING)
  public salt: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  public emailVerified: boolean;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default User;
