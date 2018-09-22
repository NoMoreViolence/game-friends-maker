import { Table, Column, Model, AllowNull, DataType, BelongsToMany, Unique, Is } from 'sequelize-typescript';
import AllGame from './allgame.model';
import AllGenreGame from './allgenregame.model';
import lib from 'src/lib';
const { regex } = lib;

@Table({ timestamps: true, tableName: 'genregame', paranoid: false })
class GenreGame extends Model<GenreGame> {
  @BelongsToMany(() => AllGame, () => AllGenreGame)
  public allid: AllGame[];

  @Unique
  @AllowNull(false)
  @Is('gamegenre', (value: string) => {
    if (!regex.gamegenreRegex.test(value)) {
      throw new Error('value');
    }
  })
  @Column(DataType.STRING)
  public genre: string;
}

export default GenreGame;

setTimeout(() => {
  // GenreGame.findOne({ where: { id: 1 }, include: [{ model: AllGame }] })
  //   .then(data => console.log(data))
  //   .catch((err: DatabaseError) => console.log(err.message));
  // GenreGame.create({
  //   genre: 'aieawefawefwf'
  // })
  //   .then(data => console.log(data.get()))
  //   .catch(err => console.log(err.message));
  // AllGame.create({
  //   gamename: 'fuck cifa',
  //   window: false,
  //   mac: false,
  //   xbox: false,
  //   ps: false,
  //   nswitch: false
  // })
  //   .then(data => {
  //     console.log(data.get());
  //   })
  //   .catch(err => console.log(err.message));
  // AllGenreGame.create({
  //   allid: 1,
  //   genreid: 2
  // });
  // AllGenreGame.create({
  //   allid: 2,
  //   genreid: 1
  // });
  // AllGame.findOne({ where: { id: 1 }, include: [{ model: GenreGame, as: 'genreid' }] })
  //   .then(data => console.log(data.dataValues))
  //   .catch(err => console.log(err.message));
  // GenreGame.findOne({ where: { id: 1 }, include: [AllGame] })
  //   .then(data => console.log(data.dataValues))
  //   .catch(err => console.log(err.message));
  // GenreGame.destroy({ where: { id: 1 } })
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err.message));
}, 2000);
