import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly id: string
  readonly name: string
  readonly surname: string
  readonly role: string
  readonly telegram: string
  readonly avatar_path: string
}
