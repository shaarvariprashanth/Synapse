import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, IsNull, Not } from 'typeorm';
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

  async updateNote(id: number, userId: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findUserNote(id, userId);

    Object.assign(note, updateNoteDto);

    return this.notesRepository.save(note);
  }

  async deleteNote(id: number, userId: number) {
    await this.findUserNote(id, userId);

    await this.notesRepository.softDelete(id);

    return {
      message: 'Note deleted successfully',
    };
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

  async getNotesByTag(tag: string, userId: number) {
    return this.notesRepository
      .createQueryBuilder('note')
      .where(':tag = ANY(note.tags)', { tag })
      .andWhere('note.userId = :userId', { userId })
      .orderBy('note.createdAt', 'DESC')
      .getMany();
  }

  async getDeletedNotes(userId: number) {
    return this.notesRepository.find({
      where: {
        user: {
          id: userId,
        },
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });
  }

  async restoreNote(id: number, userId: number) {
    await this.findUserNote(id, userId);

    await this.notesRepository.restore(id);

    return {
      message: 'Note restored successfully',
    };
  }

  private async findUserNote(noteId: number, userId: number) {
    const note = await this.notesRepository.findOne({
      where: {
        id: noteId,
        user: { id: userId },
      },
      withDeleted: true,
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async toggleFavorite(noteId: number, userId: number) {
    const note = await this.findUserNote(noteId, userId);

    note.isFavorite = !note.isFavorite;

    return this.notesRepository.save(note);
  }

  async getFavoriteNotes(userId: number) {
    return this.notesRepository.find({
      where: {
        user: {
          id: userId,
        },
        isFavorite: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }
}
