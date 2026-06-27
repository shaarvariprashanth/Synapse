import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private usersService: UsersService,
  ) {}

  async getAllNotes(userId: number, page: number, limit: number) {
    return this.notesRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      skip: (page - 1) * limit,

      take: limit,

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async createNote(createNoteDto: CreateNoteDto, userId: number) {
    const user = await this.usersService.findById(userId);
    const note = this.notesRepository.create(createNoteDto);
    note.user = user!;
    return this.notesRepository.save(note);
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.notesRepository.preload({
      id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return this.notesRepository.save(note);
  }

  async deleteNote(id: number) {
    const result = await this.notesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }

  async searchNotes(query: string, userId: number) {
    return this.notesRepository.find({
      where: [
        {
          title: ILike(`%${query}%`),
          user: {
            id: userId,
          },
        },
        {
          content: ILike(`%${query}%`),
          user: {
            id: userId,
          },
        },
      ],
    });
  }
}
