import { Table, Column, Model, AllowNull, DataType, Unique, Is } from 'sequelize-typescript';
import lib from 'src/lib';
const { regex } = lib;

@Table({ tableName: 'allgame' })
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
}

export default AllGame;
