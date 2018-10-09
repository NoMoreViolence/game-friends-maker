import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';
import { UserGameUnit, AllGame } from '.';
import { DatabaseError } from 'sequelize';
import GenreGame from './genre.model';

@Table({ timestamps: true, tableName: 'allgenregame', paranoid: false })
class AllGenreGame extends Model<AllGenreGame> {
  @ForeignKey(() => AllGame)
  @Column
  public allid: number;

  @ForeignKey(() => GenreGame)
  @Column
  public genreid: number;
}

export default AllGenreGame;
