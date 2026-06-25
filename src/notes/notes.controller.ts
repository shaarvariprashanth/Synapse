import { Controller, Get, Body, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }
}
