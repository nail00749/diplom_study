import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly surname: string;

  @ApiPropertyOptional()
  readonly role: string;

  @ApiPropertyOptional()
  readonly telegram: string;

  @ApiPropertyOptional()
  readonly avatar_path: string;
}
