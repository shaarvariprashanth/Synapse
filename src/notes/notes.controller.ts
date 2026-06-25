import { Controller, Get } from '@nestjs/common';
import { NotesService } from './notes.service';

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
}
