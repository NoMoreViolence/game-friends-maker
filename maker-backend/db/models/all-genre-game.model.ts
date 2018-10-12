import { Table, Column, Model, ForeignKey, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { AllGame, GameGenre } from '.';

@Table({ timestamps: true, tableName: 'AllGenreGame', paranoid: false })
class AllGenreGame extends Model<AllGenreGame> {
  @ForeignKey(() => AllGame)
  @Column
  public allid: number;

  @ForeignKey(() => GameGenre)
  @Column
  public genreid: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}

export default AllGenreGame;
