import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
  IsIn,
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

  @IsOptional()
  @IsIn(['title', 'createdAt', 'updatedAt'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order?: string;
}
