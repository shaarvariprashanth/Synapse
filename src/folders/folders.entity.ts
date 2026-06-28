import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Note } from '../notes/notes.entity';
import { User } from '../users/users.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Note, (note) => note.folder)
  notes!: Note[];

  @ManyToOne(() => User, (user) => user.folders)
  user!: User;
}
