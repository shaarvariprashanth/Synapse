import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';

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
}
