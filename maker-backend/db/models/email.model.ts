import { Table, Column, Model, AllowNull, DataType, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'email' })
class Email extends Model<Email> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  public email: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public confirmed: boolean;

  @CreatedAt
  public creationDate: Date;

  @UpdatedAt
  public updatedOn: Date;

  @DeletedAt
  public deletionDate: Date;
}

export default Email;
