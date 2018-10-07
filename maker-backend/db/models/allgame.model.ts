import { Table, Column, Model, AllowNull, DataType, Unique, Is, HasMany, BelongsToMany } from 'sequelize-typescript';
import Game from './game.model';
import GenreGame from './genregame.model';
import lib from 'src/lib';
import AllGenreGame from './allgenregame.model';
const { regex } = lib;

@Table({ timestamps: true, tableName: 'allgame', paranoid: false })
class AllGame extends Model<AllGame> {
  @Unique
  @AllowNull(false)
  @Is('gamename', (value: string) => {
    if (!regex.gamenameRegex.test(value)) {
      throw new Error('(gamename)');
    }
  })
  @Column(DataType.CHAR(255))
  public gamename: string;

  @AllowNull(false)
  @Is('window', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(window)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public window: boolean;

  @AllowNull(false)
  @Is('mac', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(mac)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public mac: boolean;

  @AllowNull(false)
  @Is('xbox', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(xbox)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public xbox: boolean;

  @AllowNull(false)
  @Is('ps', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(ps)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public ps: boolean;

  @AllowNull(false)
  @Is('nswitch', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(nswitch)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public nswitch: boolean;

  @AllowNull(false)
  @Is('android', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(android)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public android: boolean;

  @AllowNull(false)
  @Is('ios', (value: boolean) => {
    if (typeof value !== 'boolean') {
      throw new Error(`(ios)`);
    }
  })
  @Column(DataType.TINYINT(1))
  public ios: boolean;

  @HasMany(() => Game)
  public game: Game[];

  @BelongsToMany(() => GenreGame, () => AllGenreGame)
  public genreid: GenreGame[];
}

export default AllGame;
