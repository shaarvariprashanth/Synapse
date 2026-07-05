import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderDto {
  @ApiProperty({
    example: 'Backend',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
