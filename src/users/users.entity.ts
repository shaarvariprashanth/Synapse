import { Note } from 'src/notes/notes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Folder } from '../folders/folders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];

  @OneToMany(() => Folder, (folder) => folder.user)
  folders!: Folder[];
}
