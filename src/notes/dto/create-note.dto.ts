import { IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: 'Authentication with JWT',
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example:
      'JWT is used for stateless authentication. The server signs a token containing the user ID, and protected routes verify this token before allowing access.',
  })
  @IsNotEmpty()
  content!: string;

  @ApiProperty({
    example: ['Backend', 'Authentication'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  tags?: string[];
}
