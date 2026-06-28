import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { MoveNoteDto } from './dto/move-note.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller({
  path: 'folders',
  version: '1',
})
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createFolderDto: CreateFolderDto, @Request() req) {
    return this.foldersService.createFolder(createFolderDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFolders(@Request() req) {
    return this.foldersService.getFolders(req.user.id);
  }

  @Get(':id/notes')
  @UseGuards(JwtAuthGuard)
  async getFolderNotes(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.foldersService.getFolderNotes(id, req.user.id);
  }

  @Patch(':folderId/move')
  @UseGuards(JwtAuthGuard)
  async moveNote(
    @Param('folderId', ParseIntPipe) folderId: number,
    @Body() moveNoteDto: MoveNoteDto,
    @Request() req,
  ) {
    return this.foldersService.moveNote(
      folderId,
      moveNoteDto.noteId,
      req.user.id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async renameFolder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFolderDto: UpdateFolderDto,
    @Request() req,
  ) {
    return this.foldersService.renameFolder(id, req.user.id, updateFolderDto);
  }

  @Patch('remove-note/:noteId')
  @UseGuards(JwtAuthGuard)
  async removeNoteFromFolder(
    @Param('noteId', ParseIntPipe) noteId: number,
    @Request() req,
  ) {
    return this.foldersService.removeNoteFromFolder(noteId, req.user.id);
  }
}
