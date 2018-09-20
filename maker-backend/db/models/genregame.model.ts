import { Table, Column, Model, AllowNull, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';
import AllGame from './allgame.model';
import { Game } from '.';
import { DatabaseError } from 'sequelize';

@Table({ timestamps: true, tableName: 'genregame', paranoid: false })
class GenreGame extends Model<GenreGame> {
  @ForeignKey(() => AllGame)
  @AllowNull(false)
  @Column
  public allgameid: number;

  @BelongsTo(() => AllGame, { onDelete: 'CASCADE' })
  public allgame: AllGame;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public genre: string;
}

export default GenreGame;

setTimeout(() => {
  GenreGame.findOne({ where: { id: 1 }, include: [{ model: AllGame }] })
    .then(data => console.log(data.dataValues))
    .catch((err: DatabaseError) => console.log(err.message));
}, 2000);
