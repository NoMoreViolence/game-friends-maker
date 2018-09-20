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
import Game from './game.model';
const { regex } = lib;

@Table({ timestamps: true, tableName: 'user', paranoid: false })
class User extends Model<User> {
  @Unique
  @Is('username', (value: string) => {
    if (!regex.usernameRegex.test(value)) {
      throw new Error(`(username)`);
    }
  })
  @AllowNull(false)
  @Column(DataType.STRING)
  public username: string;

  @Unique
  @Is('email', (value: string) => {
    if (!regex.emailRegex.test(value)) {
      throw new Error(`(email)`);
    }
  })
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
  public verified: boolean;

  @Default('.')
  @Column(DataType.STRING)
  public emailkey: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  public show: boolean;

  @HasMany(() => Game)
  public game: Game[];

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default User;
