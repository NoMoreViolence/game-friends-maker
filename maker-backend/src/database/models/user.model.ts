import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @Column({ type: 'varchar', length: 50 })
  public email: string;

  @Column({ type: 'varchar', length: 200 })
  public googleId: string;

  @Column({ type: 'varchar', length: 50 })
  public salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;
}
