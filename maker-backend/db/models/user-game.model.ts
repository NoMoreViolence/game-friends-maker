import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  Unique,
  Default
} from 'sequelize-typescript';
import { User, AllGame } from '.';

@Table({ timestamps: true, tableName: 'userGame', paranoid: false })
class UserGame extends Model<UserGame> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER(11))
  public userid: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  public user: User;

  @ForeignKey(() => AllGame)
  @AllowNull(false)
  @Column(DataType.INTEGER(11))
  public gamekey: number;

  @BelongsTo(() => AllGame, { onDelete: 'CASEADE' })
  public game: AllGame;

  @Unique
  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public nickname: string;

  @AllowNull(false)
  @Column(DataType.CHAR(255))
  public expert: number;

  @Default(true)
  @AllowNull(false)
  @Column(DataType.TINYINT(1))
  public show: boolean;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default UserGame;

// setTimeout(() => {
//   AllGame.create({
//     gamename: 'aew122fwea',
//     window: false,
//     mac: false,
//     xbox: false,
//     ps: false,
//     nswitch: false
//   });
// }, 1000);

// setTimeout(() => {
//   Game.findOne({ where: { id: 1 }, include: [User] })
//     .then((data: Game) => {
//       const a = data.dataValues;
//       console.log(a.user.dataValues);
//     })
//     .catch((err: DatabaseError) => console.log(err.message));

//   User.findOne({ where: { id: 1 }, include: [{ model: Game, attributes: ['expert', 'nickname'] }] })
//     .then(data => {
//       const a = data.dataValues;
//       console.log(a);
//     })
//     .catch((err: DatabaseError) => console.log(err.message));
// }, 2000);
// insert into game (userid, gamekey, nickname, expert, creationDate, updatedOn) values (1, 1, 'fuckpark', 'master', 20202, 20202);
