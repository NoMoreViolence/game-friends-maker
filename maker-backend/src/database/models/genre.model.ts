import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Game } from './game.model';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @ManyToMany(type => Game, game => game.genres, { onDelete: 'CASCADE' })
  public games: Game[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;
}
