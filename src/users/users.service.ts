import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return this.usersRepository.find();
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(name: string, email: string, password: string) {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    return this.usersRepository.save(user);
  }
}
