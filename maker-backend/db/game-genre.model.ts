import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  HasMany,
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
  @Unique
  @AllowNull(false)
  @Is('gamegenre', (value: string) => {
    if (!regex.gamegenreRegex.test(value)) {
      throw new Error('value');
    }
  })
  @Column(DataType.CHAR(255))
  public genre: string;

  @BelongsToMany(() => AllGame, () => AllGenreGame)
  public games: AllGame[];

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}

export default GameGenre;
