import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsToMany,
  Unique,
  Is,
  CreatedAt,
  UpdatedAt,
  DeletedAt
} from 'sequelize-typescript';
import { AllGame, AllGenreGame } from '.';
import lib from 'src/lib';

const { regex } = lib;

@Table({ timestamps: true, tableName: 'GameGenre', paranoid: false })
class GameGenre extends Model<GameGenre> {
  @BelongsToMany(() => AllGame, () => AllGenreGame)
  public gameId: AllGame[];

  @Unique
  @AllowNull(false)
  @Is('gamegenre', (value: string) => {
    if (!regex.gamegenreRegex.test(value)) {
      throw new Error('value');
    }
  })
  @Column(DataType.CHAR(255))
  public genre: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}

export default GameGenre;

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
