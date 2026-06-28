import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Folder } from './folders.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Note } from 'src/notes/notes.entity';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,

    @InjectRepository(Note)
    private notesRepository: Repository<Note>,

    private usersService: UsersService,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto, userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const folder = this.foldersRepository.create({
      name: createFolderDto.name,
      user,
    });

    return this.foldersRepository.save(folder);
  }

  async getFolders(userId: number) {
    return this.foldersRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async moveNote(folderId: number, noteId: number, userId: number) {
    const folder = await this.foldersRepository.findOne({
      where: {
        id: folderId,
        user: {
          id: userId,
        },
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    const note = await this.notesRepository.findOne({
      where: {
        id: noteId,
        user: {
          id: userId,
        },
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.folder = folder;

    return this.notesRepository.save(note);
  }

  async getFolderNotes(folderId: number, userId: number) {
    const folder = await this.foldersRepository.findOne({
      where: {
        id: folderId,
        user: {
          id: userId,
        },
      },
      relations: {
        notes: true,
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return folder;
  }

  async renameFolder(
    folderId: number,
    userId: number,
    updateFolderDto: UpdateFolderDto,
  ) {
    const folder = await this.foldersRepository.findOne({
      where: {
        id: folderId,
        user: {
          id: userId,
        },
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    folder.name = updateFolderDto.name;

    return this.foldersRepository.save(folder);
  }

  async removeNoteFromFolder(noteId: number, userId: number) {
    const note = await this.notesRepository.findOne({
      where: {
        id: noteId,
        user: {
          id: userId,
        },
      },
      relations: {
        folder: true,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.folder = null;

    return this.notesRepository.save(note);
  }
}
