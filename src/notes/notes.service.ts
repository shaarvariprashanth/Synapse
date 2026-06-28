import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, IsNull, Not } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from '../users/users.service';
import { FilterNoteDto } from './dto/filter-note.dto';

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
        isArchived: false,
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

  async toggleArchive(noteId: number, userId: number) {
    const note = await this.findUserNote(noteId, userId);

    note.isArchived = !note.isArchived;

    return this.notesRepository.save(note);
  }

  async getArchivedNotes(userId: number) {
    return this.notesRepository.find({
      where: {
        user: {
          id: userId,
        },
        isArchived: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async filterNotes(userId: number, filters: FilterNoteDto) {
    const query = this.notesRepository.createQueryBuilder('note');

    query.where('note.userId = :userId', {
      userId,
    });

    if (filters.favorite) {
      query.andWhere('note.isFavorite = :favorite', {
        favorite: filters.favorite === 'true',
      });
    }

    if (filters.archived) {
      query.andWhere('note.isArchived = :archived', {
        archived: filters.archived === 'true',
      });
    }

    if (filters.folderId) {
      query.andWhere('note.folderId = :folderId', {
        folderId: Number(filters.folderId),
      });
    }

    if (filters.tag) {
      query.andWhere(':tag = ANY(note.tags)', {
        tag: filters.tag,
      });
    }

    const sortBy = filters.sortBy ?? 'updatedAt';

    const order = (filters.order?.toUpperCase() as 'ASC' | 'DESC') ?? 'DESC';

    query.orderBy(`note.${sortBy}`, order);

    return query.getMany();
  }
}
