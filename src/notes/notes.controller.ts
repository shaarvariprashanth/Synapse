import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Patch,
  ParseIntPipe,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.notesService.deleteNote(id);
  }
}
