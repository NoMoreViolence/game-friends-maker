import { Table, Column, Model, AllowNull, DataType, Unique, Is, HasMany, BelongsToMany } from 'sequelize-typescript';
import Game from './game.model';
import GenreGame from './genregame.model';
import lib from 'src/lib';
import AllGenreGame from './allgenregame.model';
const { regex } = lib;

@Table({ timestamps: true, tableName: 'allgame', paranoid: false })
class AllGame extends Model<AllGame> {
  @Unique
  // @Is('gamename', (value: string) => {
  //   if (!regex.gamenameRegex.test(value)) {
  //     throw new Error('(gamename)');
  //   }
  // })
  @AllowNull(false)
  @Column(DataType.STRING)
  public gamename: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public window: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public mac: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public xbox: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public ps: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public nswitch: boolean;

  @HasMany(() => Game)
  public game: Game[];

  @BelongsToMany(() => GenreGame, () => AllGenreGame)
  public genreid: GenreGame[];
}

export default AllGame;
