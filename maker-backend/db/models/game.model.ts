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
  HasOne
} from 'sequelize-typescript';
import User from './user.model';
import AllGame from './allgame.model';

@Table({ timestamps: true, tableName: 'game', paranoid: false })
class Game extends Model<Game> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  public userid: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  public user: User;

  @ForeignKey(() => AllGame)
  @AllowNull(false)
  @Column
  public gamekey: number;

  @BelongsTo(() => AllGame, { onDelete: 'CASEADE' })
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
