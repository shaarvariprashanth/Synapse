import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async getAllNotes() {
    return this.notesRepository.find();
  }

  async createNote(createNoteDto: CreateNoteDto) {
    const note = this.notesRepository.create(createNoteDto);

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
}
