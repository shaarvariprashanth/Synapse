import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Folder } from './folders.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,

    private usersService: UsersService,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto, userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const folder = this.foldersRepository.create({
      name: createFolderDto.name,
      user,
    });

    return this.foldersRepository.save(folder);
  }

  async getFolders(userId: number) {
    return this.foldersRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
