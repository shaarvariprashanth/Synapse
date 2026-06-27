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
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllNotes(
    @Request() req,

    @Query('page') page = '1',

    @Query('limit') limit = '10',
  ) {
    const notes = await this.notesService.getAllNotes(
      req.user.id,
      Number(page),
      Number(limit),
    );
    return new ApiResponseDto('Notes retrieved successfully', notes);
  }

  @Get('tag/:tag')
  @UseGuards(JwtAuthGuard)
  getNotesByTag(@Param('tag') tag: string, @Request() req) {
    return this.notesService.getNotesByTag(tag, req.user.id);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchNotes(@Query('query') query: string, @Request() req) {
    const notes = await this.notesService.searchNotes(query, req.user.id);
    return new ApiResponseDto('Search completed successfully', notes);
  }

  @Get('deleted')
  @UseGuards(JwtAuthGuard)
  getDeletedNotes(@Request() req) {
    return this.notesService.getDeletedNotes(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    const notes = await this.notesService.createNote(
      createNoteDto,
      req.user.id,
    );
    return new ApiResponseDto('Note created successfully', notes);
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
  async restore(
    @Param('id', ParseIntPipe)
    id: number,

    @Request()
    req,
  ) {
    await this.notesService.restoreNote(id, req.user.id);
    return new ApiResponseDto('Note restored successfully', null);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(
    @Param('id', ParseIntPipe)
    id: number,

    @Request()
    req,
  ) {
    await this.notesService.deleteNote(id, req.user.id);
    return new ApiResponseDto('Note deleted successfully', null);
  }
}
