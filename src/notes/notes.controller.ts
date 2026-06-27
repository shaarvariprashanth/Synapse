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
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllNotes(@Request() req) {
    return this.notesService.getAllNotes(req.user.id);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  searchNotes(@Query('query') query: string, @Request() req) {
    return this.notesService.searchNotes(query, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.createNote(createNoteDto, req.user.id);
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
