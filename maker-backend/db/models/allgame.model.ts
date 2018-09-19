import { Table, Column, Model, AllowNull, DataType, Unique, Is, HasMany } from 'sequelize-typescript';
import Game from './game.model';
import lib from 'src/lib';
const { regex } = lib;

@Table({ timestamps: true, tableName: 'allgame', paranoid: false })
class AllGame extends Model<AllGame> {
  @Unique
  @Is('gamename', (value: string) => {
    if (!regex.gamenameRegex.test(value)) {
      throw new Error('(gamename)');
    }
  })
  @AllowNull(false)
  @Column(DataType.STRING)
  public gamename: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public genre: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public console: boolean;

  @HasMany(() => Game)
  public game: Game[];
}

export default AllGame;
