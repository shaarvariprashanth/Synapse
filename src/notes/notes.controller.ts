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
  getAllNotes(
    @Request() req,

    @Query('page') page = '1',

    @Query('limit') limit = '10',
  ) {
    return this.notesService.getAllNotes(
      req.user.id,
      Number(page),
      Number(limit),
    );
  }

  @Get('tag/:tag')
  @UseGuards(JwtAuthGuard)
  getNotesByTag(@Param('tag') tag: string, @Request() req) {
    return this.notesService.getNotesByTag(tag, req.user.id);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  searchNotes(@Query('query') query: string, @Request() req) {
    return this.notesService.searchNotes(query, req.user.id);
  }

  @Get('deleted')
  @UseGuards(JwtAuthGuard)
  getDeletedNotes(@Request() req) {
    return this.notesService.getDeletedNotes(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.createNote(createNoteDto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateNoteDto: UpdateNoteDto,

    @Request()
    req,
  ) {
    return this.notesService.updateNote(id, req.user.id, updateNoteDto);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(
    @Param('id', ParseIntPipe)
    id: number,

    @Request()
    req,
  ) {
    return this.notesService.restoreNote(id, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe)
    id: number,

    @Request()
    req,
  ) {
    return this.notesService.deleteNote(id, req.user.id);
  }
}
