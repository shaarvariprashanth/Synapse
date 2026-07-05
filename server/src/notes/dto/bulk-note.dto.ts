import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class BulkNoteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({
    each: true,
  })
  noteIds!: number[];
}
