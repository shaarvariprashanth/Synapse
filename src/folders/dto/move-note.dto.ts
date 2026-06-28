import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MoveNoteDto {
  @ApiProperty({
    example: 5,
  })
  @IsInt()
  noteId!: number;
}
