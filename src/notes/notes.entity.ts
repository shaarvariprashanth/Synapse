import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Folder } from '../folders/folders.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.notes)
  user!: User;

  @Column('text', {
    array: true,
    default: [],
  })
  tags!: string[];

  @ManyToOne(() => Folder, (folder) => folder.notes, {
    nullable: true,
  })
  folder!: Folder | null;
}
