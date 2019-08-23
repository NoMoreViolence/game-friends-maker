import { Column, CreateDateColumn, Entity, UpdateDateColumn, ObjectIdColumn } from 'typeorm';
import { generateUUID } from 'helpers/uuid';

@Entity({ name: 'users' })
class User {
  @ObjectIdColumn({ name: '_id' })
  id: string = generateUUID();

  @Column()
  userTokenId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  googleId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: null })
  deletedAt: Date;
}

export { User };
