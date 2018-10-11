import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';
import { AllGame, GameGenre } from '.';

@Table({ timestamps: true, tableName: 'AllGenreGame', paranoid: false })
class AllGenreGame extends Model<AllGenreGame> {
  @ForeignKey(() => AllGame)
  @Column
  public allid: number;

  @ForeignKey(() => GameGenre)
  @Column
  public genreid: number;
}

export default AllGenreGame;
