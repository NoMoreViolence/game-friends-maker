import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  Default,
  Unique
} from 'sequelize-typescript';

@Table({ tableName: 'allgame' })
class AllGame extends Model<AllGame> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public gamename: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public genre: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public console: boolean;
}

export default AllGame;
