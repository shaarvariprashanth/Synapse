import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'Shaarvari',
  })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'shaarvari@test.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
  })
  @MinLength(8)
  password!: string;
}
