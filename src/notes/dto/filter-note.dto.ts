import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterNoteDto {
  @IsOptional()
  @IsBooleanString()
  favorite?: string;

  @IsOptional()
  @IsBooleanString()
  archived?: string;

  @IsOptional()
  @IsNumberString()
  folderId?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
