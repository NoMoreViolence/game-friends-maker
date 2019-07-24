import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Genre } from './genre.model';
import { Post } from './post.model';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @OneToMany(type => Post, post => post.game, { onDelete: 'CASCADE' })
  public posts: Post[];

  @ManyToMany(type => Genre, genre => genre.games, { onDelete: 'CASCADE' })
  public genres: Genre[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  public deletedAt: Date;
}
