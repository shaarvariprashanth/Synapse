import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

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
}
