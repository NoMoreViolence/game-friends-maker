import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Game } from './game.model';
import { Genre } from './genre.model';
import { User } from './user.model';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'tinyint', precision: 1 })
  public isMatched: boolean;

  @ManyToOne(type => User, user => user.posts, { onDelete: 'CASCADE' })
  public user: User;

  @ManyToOne(type => Game, game => game.posts, { onDelete: 'CASCADE' })
  public game: Game;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;
}
