import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { Folder } from './folders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';
import { Note } from 'src/notes/notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, User, Note]), UsersModule],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
