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
  Unique
} from 'sequelize-typescript';
import User from './user.model';
import AllGame from './allgame.model';

@Table({ timestamps: true, tableName: 'game' })
class Game extends Model<Game> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({})
  public userid: number;

  @BelongsTo(() => User)
  public user: User;

  @AllowNull(false)
  @ForeignKey(() => AllGame)
  @Column({})
  public gamekey: number;

  @BelongsTo(() => AllGame)
  public game: AllGame;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public nickname: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public expert: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default Game;
