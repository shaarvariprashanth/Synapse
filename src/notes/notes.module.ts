import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes.entity';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note])],
})
export class NotesModule {}
