import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  HasMany,
  BelongsToMany,
  Unique,
  Is,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { AllGame, AllGenreGame, User, UserGame } from '.';
import lib from 'src/lib';

const { regex } = lib;

@Table({ timestamps: true, tableName: 'Post', paranoid: false })
class Post extends Model<Post> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER(11))
  public userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  public user: User;

  @ForeignKey(() => AllGame)
  @AllowNull(false)
  @Column(DataType.INTEGER(11))
  public gameId: number;

  @BelongsTo(() => AllGame, { onDelete: 'CASEADE' })
  public game: AllGame;

  @ForeignKey(() => UserGame)
  @AllowNull(true)
  @Column(DataType.INTEGER(11))
  public userGameId: number;
  @BelongsTo(() => UserGame)
  public userGame: UserGame;

  @Column(DataType.CHAR(255))
  public comment: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}

export default Post;
