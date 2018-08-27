import { Table, Column, Model, AllowNull, DataType, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';

@Table({ timestamps: true })
class User extends Model<User> {
  @Column({ type: DataType.STRING({ length: 50 }) })
  @Unique
  @AllowNull(false)
  public username: string;

  @Column(DataType.STRING({ length: 100 }))
  @Unique
  @AllowNull(false)
  public email: string;

  @Column(DataType.STRING({ length: 50 }))
  @AllowNull(false)
  public password: string;

  @Column(DataType.INTEGER)
  @AllowNull(false)
  public salt: number;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export { User };
