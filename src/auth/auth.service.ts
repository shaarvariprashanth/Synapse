import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = this.usersRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
