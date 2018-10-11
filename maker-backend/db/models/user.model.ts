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
  DeletedAt,
  Is,
  HasMany
} from 'sequelize-typescript';
import lib from 'src/lib';
import { UserGame } from '.';

const { regex } = lib;

@Table({ timestamps: true, tableName: 'User', paranoid: false })
class User extends Model<User> {
  @Unique
  @Is('username', (value: string) => {
    if (!regex.usernameRegex.test(value)) {
      throw new Error('(username)');
    }
  })
  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public username: string;

  @Unique
  @Is('email', (value: string) => {
    if (!regex.emailRegex.test(value)) {
      throw new Error('(email)');
    }
  })
  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public email: string;

  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public password: string;

  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public salt: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.TINYINT(1))
  public verified: boolean;

  @Default('.')
  @Column(DataType.CHAR(255))
  public emailkey: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.TINYINT(1))
  public show: boolean;

  @HasMany(() => UserGame)
  public game: UserGame[];

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default User;
